import React, { type PropsWithChildren } from "react";
import styles from "./_actionButton.module.css";

interface ActionButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ActionButton({
    children,
    ...rest
}: PropsWithChildren<ActionButtonProps>): React.JSX.Element {
    return (
        <button className={styles.actionButton} {...rest}>
            {children}
        </button>
    );
}
