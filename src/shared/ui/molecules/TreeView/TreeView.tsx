// ? Slice Imports
import styles from "./TreeView.module.css";

// ? Types
type TInnerModel = {
    id: string;
    title: string;
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
                        <ul>
                            {Object.entries(group.items).map(([keyItem, item]) => (
                                <li key={keyItem}>
                                    <p>{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
