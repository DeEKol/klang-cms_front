// ? Layer Imports
import { Link } from "shared/ui/atoms";
// ? Slice Imports
import styles from "./Header.module.css";

/*
 * Компонент, хедер
 */
export function Header() {
    return (
        <header className={styles.Header}>
            <div className={styles.brand}>
                klang<span>cms</span>
            </div>
            <nav className={styles.nav}>
                <Link to="/" variant="nav">
                    Home
                </Link>
                <Link to="/about" variant="nav">
                    About
                </Link>
                <Link to="/lesson" variant="nav">
                    Lesson
                </Link>
            </nav>
        </header>
    );
}
