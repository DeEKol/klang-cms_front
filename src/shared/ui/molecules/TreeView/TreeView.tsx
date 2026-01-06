// ? Slice Imports
import styles from "./TreeView.module.css";
import { Link } from "react-router";

// ? Types
export type TInnerModel = {
    id: string;
    title: string;
    linkTo: string;
};

export type TTreeViewModel = {
    [key: string]: {
        id: string;
        title: string;
        items: { [key: string]: TInnerModel };
    };
};

type TTreeViewProps = {
    model: TTreeViewModel;
};

export function TreeView(props: TTreeViewProps) {
    // ? Props From
    const { model } = props;

    return (
        <div className={styles.TreeView}>
            <ul>
                {Object.entries(model).map(([keyGroup, group]) => (
                    <li key={keyGroup}>
                        <p>{group.title}</p>
                        <ol>
                            {Object.entries(group.items).map(([keyItem, item]) => (
                                <li key={keyItem}>
                                    <Link to={`/lesson/${item.linkTo}`}>{item.title}</Link>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ul>
        </div>
    );
}
