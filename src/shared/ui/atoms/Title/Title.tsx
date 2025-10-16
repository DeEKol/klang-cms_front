// ? Library Imports
import { ReactNode } from "react";
// ? Slice Imports
import styles from "./Title.module.css";

// ? Types
type TTitleProps = {
    children: ReactNode;
};

export function Title(props: TTitleProps) {
    // ? Props From
    const { children } = props;

    // ? Render
    return <h3 className={styles.Title}>{children}</h3>;
}
