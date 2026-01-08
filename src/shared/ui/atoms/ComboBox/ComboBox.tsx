// ? Library Imports
import { ReactNode } from "react";
// ? Slice Imports
import styles from "./ComboBox.module.css";

// ? Styles
type TComboBoxProps = {
    trigger: ReactNode;
    popup: ReactNode;
    isOpen: boolean;
};

/*
 * Component
 */
export function ComboBox(props: TComboBoxProps) {
    // ? Props From
    const { trigger, popup, isOpen } = props;

    // ? Render
    return (
        <div className={styles.ComboBox}>
            {trigger}
            {isOpen && popup}
        </div>
    );
}
