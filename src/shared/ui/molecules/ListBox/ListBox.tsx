// ? Slice Imports
import styles from "./ListBox.module.css";
import { TOption } from "./types";
import { Button } from "../../atoms/Button";

// ? Types
type TListBoxProps = {
    options: Map<string | undefined, TOption>;
    clickListener: (key: string | undefined) => void;
    select: string | undefined;
};

/*
 * UI Component
 * TODO: single-select, multi-select;
 */
export function ListBox(props: TListBoxProps) {
    // ? Props From
    const { options, clickListener, select } = props;

    // ? Render
    return (
        <ul className={styles.ListBox}>
            {[...options].map(([key, option]) => {
                if (key) {
                    return (
                        <li key={key} className={select === key ? styles.selected : ""}>
                            <Button onClick={() => clickListener(key)} variant="ghost">
                                {option.name}
                            </Button>
                        </li>
                    );
                }
            })}
        </ul>
    );
}
