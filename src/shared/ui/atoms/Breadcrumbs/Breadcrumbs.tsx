// ? Library Imports
import { Fragment } from "react";
// ? Slice Imports
import { Link } from "../Link";
import styles from "./Breadcrumbs.module.css";

// ? Types
type TBreadcrumbItem = {
    label: string;
    to?: string;
};

type TBreadcrumbsProps = {
    items: TBreadcrumbItem[];
};

export function Breadcrumbs(props: TBreadcrumbsProps) {
    // ? Props From
    const { items } = props;

    // ? Render
    return (
        <nav className={styles.Breadcrumbs}>
            {items.map((item, index) => (
                <Fragment key={index}>
                    {index > 0 && <span className={styles.separator}>/</span>}
                    {item.to ? (
                        <Link to={item.to} variant="link" size="s">
                            {item.label}
                        </Link>
                    ) : (
                        <span className={styles.current}>{item.label}</span>
                    )}
                </Fragment>
            ))}
        </nav>
    );
}
