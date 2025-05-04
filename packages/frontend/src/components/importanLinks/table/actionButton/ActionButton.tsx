import React, { type PropsWithChildren } from "react";
import styles from "./actionButton.module.css";
import { Link } from "@/utils/models";
import { type CellContext } from "@tanstack/react-table";

interface ActionButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    info: CellContext<Link, string | number | unknown>;
}

export default function ActionButton({
    info,
    children,
    ...rest
}: PropsWithChildren<ActionButtonProps>): React.JSX.Element {
    const handleClick = () => {
        const linkData = info.row.original;
        console.log("Button clicked for:", linkData.name);
    };

    return (
        <button onClick={handleClick} className={styles.actionButton} {...rest}>
            {children}
        </button>
    );
}
