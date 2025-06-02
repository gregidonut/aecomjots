import React, { useState, useEffect } from "react";
import type { CellContext } from "@tanstack/react-table";
import type { FrequentKb } from "@/utils/models";

export default function EditableCell({
    getValue,
    row,
    column,
    table,
}: CellContext<FrequentKb, string>): React.JSX.Element {
    const initVal = getValue();
    const [val, setVal] = useState<string>(initVal);

    useEffect(
        function () {
            setVal(initVal);
        },
        [initVal],
    );

    function onBlurHandler() {
        table.options.meta?.updateData(row.index, column.id, val);
    }
    return (
        <input
            value={val}
            onChange={function (e) {
                setVal(e.target.value);
            }}
            onBlur={onBlurHandler}
        />
    );
}
