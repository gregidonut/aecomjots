import React, { useState } from "react";
import { type UseQueryResult } from "@tanstack/react-query";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    type RowData,
} from "@tanstack/react-table";
import { useTPointers } from "../../_tPointersQueries";
import { FrequentKb } from "@/utils/models";
import styles from "./_table.module.css";
import ActionButton from "./actionButton/_ActionButton";
import EditableCell from "./editableCell/_EditableCell";

const columnHelper = createColumnHelper<FrequentKb>();
const columns = [
    columnHelper.accessor("cc", {
        header: "count",
        cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("kb_num", {
        header: "code",
        cell: EditableCell,
    }),
    columnHelper.accessor("name", {
        header: "---",
        cell: function (info) {
            const url = info.row.original.url;
            if (url) {
                return <a href={url}>{info.getValue()}</a>;
            }
            return <p>{info.getValue()}</p>;
        },
    }),
    columnHelper.display({
        id: "editAction",
        header: "",
        cell: function (info) {
            return (
                <ActionButton
                    onClick={function () {
                        const linkData = info.row.original;
                        console.log("editButton clicked for:", linkData);
                    }}
                >
                    edit
                </ActionButton>
            );
        },
    }),
    columnHelper.display({
        id: "deleteAction",
        header: "",
        cell: function (info) {
            return (
                <ActionButton
                    onClick={function () {
                        const linkData = info.row.original;
                        console.log("deleteButton clicked for:", linkData.name);
                    }}
                >
                    delete
                </ActionButton>
            );
        },
    }),
];

declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: string) => void;
    }
}

export default function Table(): React.JSX.Element {
    const [, { data }] = useTPointers() as [any, UseQueryResult<FrequentKb[]>];
    const [d, setD] = useState<FrequentKb[]>(data ?? []);

    const table = useReactTable({
        data: d,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            updateData: function (
                rowIndex: number,
                columnId: string,
                value: string,
            ) {
                setD(function (prev: FrequentKb[]): FrequentKb[] {
                    return prev.map(function (row, i): FrequentKb {
                        if (i !== rowIndex) {
                            return row;
                        }
                        return {
                            ...prev[i],
                            [columnId]: value,
                        } as FrequentKb;
                    });
                });
            },
        },
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
