// ? Library Imports
import { ReactNode } from "react";
// ? Slice Imports
import styles from "./Title.module.css";

// ? Types
type TTitleProps = {
    children: ReactNode;
    variant?: "default" | "muted" | "accent";
    size?: "s" | "m" | "l";
};

const tagBySize: Record<NonNullable<TTitleProps["size"]>, "h3" | "h2" | "h1"> = {
    s: "h3",
    m: "h2",
    l: "h1",
};

/*
 * Компонент Заголовок
 */
export function Title(props: TTitleProps) {
    // ? Props From
    const { children, variant = "default", size = "m" } = props;

    const Tag = tagBySize[size];

    // ? Render
    return (
        <Tag className={styles.Title + " " + styles[variant] + " " + styles[size]}>{children}</Tag>
    );
}
