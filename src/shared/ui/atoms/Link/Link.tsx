// ? Library Imports
import { Link as RouterLink } from "react-router";
import type { ReactNode } from "react";
// ? Slice Imports
import styles from "./Link.module.css";

// ? Types
type TLinkProps = {
    children: ReactNode;
    to: string;
    variant?:
        | "link"
        | "nav"
        | "button"
        | "button-accept"
        | "button-cancel"
        | "button-delete"
        | "button-alter";
    size?: "s" | "m" | "l";
};

export function Link(props: TLinkProps) {
    // * Props
    const { children, to, variant = "link", size = "m" } = props;

    // ? Render
    return (
        <RouterLink className={styles.Link + " " + styles[variant] + " " + styles[size]} to={to}>
            {children}
        </RouterLink>
    );
}
