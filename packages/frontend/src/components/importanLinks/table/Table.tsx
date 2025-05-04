import React, { useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { Link } from "@/utils/models";
import styles from "./table.module.css";
import ActionButton from "./actionButton/ActionButton";

const columnHelper = createColumnHelper<Link>();
const columns = [
    columnHelper.accessor("cc", {
        header: "count",
        cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("name", {
        header: "---",
        cell: (info) => {
            const url = info.row.original.url;
            return <a href={url}>{info.getValue()}</a>;
        },
    }),
    columnHelper.accessor("url", {
        header: "url",
        cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: (info) => {
            return <ActionButton info={info}>action</ActionButton>;
        },
    }),
];
export default function Table({ d }: { d: Link[] }): React.JSX.Element {
    const [data, setData] = useState<Link[]>([]);
    useEffect(function (): void {
        setData(d);
    }, []);
    const table = useReactTable({
        data,
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
