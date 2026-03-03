// ? Layer Imports
import { Layout } from "widgets/Layout";
import { Link } from "shared/ui/atoms";
// ? Slice Imports
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
    return (
        <Layout>
            <div className={styles.NotFoundPage}>
                <p className={styles.code}>404</p>
                <p className={styles.title}>Страница не найдена</p>
                <p className={styles.description}>Запрашиваемый адрес не существует</p>
                <Link to="/" variant="button">
                    На главную
                </Link>
            </div>
        </Layout>
    );
}
