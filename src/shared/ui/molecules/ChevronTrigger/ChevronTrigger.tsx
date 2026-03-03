// ? Slice Imports
import styles from "./ChevronTrigger.module.css";
import { Button } from "../../atoms/Button";
import { TOption } from "../../molecules/ListBox";
import { ChevronSvg } from "./ChevronSvg/ChevronSvg";

// ? Types
type TChevronTriggerProps = {
    options: Map<string | undefined, TOption>;
    select: string | undefined;
    isOpen: boolean;
    onClick: () => void;
};

/*
 * Component
 */
export function ChevronTrigger(props: TChevronTriggerProps) {
    // ? Props From
    const { options, onClick, select, isOpen } = props;

    // ? Render
    return (
        <Button onClick={onClick}>
            <span className={styles.triggerInner}>
                {options.get(select)?.name ?? "Выбор"}
                <ChevronSvg isOpen={isOpen} />
            </span>
        </Button>
    );
}
