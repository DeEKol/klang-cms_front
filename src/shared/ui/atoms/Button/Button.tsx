// ? Library Imports
import { MouseEventHandler, ReactNode } from "react";
// ? Slice Imports
import styles from "./Button.module.css";

// ? Types
type TButtonProps = {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    variant?: "default" | "accept" | "cancel" | "alter" | "delete";
    // size?: "s" | "m" | "l";
    // theme?: "light" | "dark";
    // isActive?: boolean;
};
export function Button(props: TButtonProps) {
    // * Props
    const { children, onClick, variant = "default" } = props;

    // ? Render
    return (
        <button className={styles.Button + " " + styles[variant]} onClick={onClick}>
            {children}
        </button>
    );
}
