// ? Library Imports
import { ReactNode } from "react";
// ? Slice Imports
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";

// ? Types
type TLayoutProps = {
    children: ReactNode;
};

/*
 * Компонент, лейаут
 */
export function Layout(props: TLayoutProps) {
    // ? Props From
    const { children } = props;

    // ? Render
    return (
        <div className={styles.Layout}>
            <Header />
            <main className={styles.content}>{children}</main>
            <Footer />
        </div>
    );
}
