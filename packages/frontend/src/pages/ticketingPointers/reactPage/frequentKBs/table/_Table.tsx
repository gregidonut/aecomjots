import React from "react";
import type { UseQueryResult } from "@tanstack/react-query";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { useTPointers } from "../../_tPointersQueries";
import { FrequentKb } from "@/utils/models";
import styles from "./_table.module.css";
import ActionButton from "./actionButton/_ActionButton";

const columnHelper = createColumnHelper<FrequentKb>();
const columns = [
    columnHelper.accessor("cc", {
        header: "count",
        cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("kb_num", {
        header: "code",
        cell: (info) => <code>{info.getValue()}</code>,
    }),
    columnHelper.accessor("name", {
        header: "---",
        cell: (info) => {
            const url = info.row.original.url;
            return <a href={url}>{info.getValue()}</a>;
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: (info) => {
            return <ActionButton info={info}>action</ActionButton>;
        },
    }),
];
export default function Table(): React.JSX.Element {
    const [, { data }] = useTPointers() as [any, UseQueryResult<FrequentKb[]>];
    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const headerGroups = table.getHeaderGroups();
    const rowModel = table.getRowModel();
    return (
        <table className={styles.table}>
            <thead>
                {headerGroups.map(function (headerGroup) {
                    return (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(function (header) {
                                return (
                                    <th key={header.id}>
                                        {
                                            header.column.columnDef
                                                .header as string
                                        }
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody>
                {rowModel.rows.map(function (row) {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(function (cell) {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
