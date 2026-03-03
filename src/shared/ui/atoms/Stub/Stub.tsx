// ? Library Imports
import { ReactNode } from "react";
// ? Slice Imports
import styles from "./Stub.module.css";

// ? Types
type TStubProps = {
    title: ReactNode;
    description?: ReactNode;
};

/*
 * Компонент Заглушка
 */
export function Stub(props: TStubProps) {
    // ? Props From
    const { title, description } = props;

    // ? Render
    return (
        <div className={styles.Stub}>
            <p className={styles.title}>{title}</p>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
}
