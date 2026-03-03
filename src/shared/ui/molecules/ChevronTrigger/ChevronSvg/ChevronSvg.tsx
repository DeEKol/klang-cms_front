// ? Slice Imports
import styles from "./ChevronSvg.module.css";

// ? Types
type TChevronSvgProps = {
    isOpen: boolean;
};

/*
 * Component
 */
export function ChevronSvg(props: TChevronSvgProps) {
    // ? Props From
    const { isOpen } = props;

    // ? Render
    return (
        <span className={styles.ChevronSvg + (isOpen ? " " + styles.open : "")}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}
