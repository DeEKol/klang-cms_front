// ? Library Imports
import { useState } from "react";
// ? Slice Imports
import styles from "./SelectorButtonListbox.module.css";
import { ComboBox } from "../../atoms/ComboBox";
import { Button } from "../../atoms/Button";
import { ListBox } from "../../molecules/ListBox";
import { TOption } from "../../molecules/ListBox";

type SelectorButtonListboxProps = {
    options: Map<string | undefined, TOption>;
    selectListener: (option: TOption | undefined) => void;
    selectedKey?: string | undefined; // * key
};

/*
 * Component Selector
 * @options Map<string | undefined, TOption> - Ключ === undefined,
 * то это дефолтное значение, которое нельзя выбрать и которое пишется в Кнопке
 * @selectedKey Выбранное значение по дефолту
 */
export function SelectorButtonListbox(props: SelectorButtonListboxProps) {
    // ? Props From
    const { options, selectListener, selectedKey = undefined } = props;

    // ! React
    const [isOpenState, setIsOpenState] = useState<boolean>(false);
    const [selectState, setSelectState] = useState<string | undefined>(selectedKey);

    const listboxClickListener = (optionKey: string | undefined) => {
        setSelectState(optionKey);
        selectListener(options.get(optionKey));
        setIsOpenState((prevState) => !prevState);
    };

    // ? Render
    return (
        <div className={styles.SelectorButtonListbox}>
            <ComboBox
                trigger={
                    <Button onClick={() => setIsOpenState((prevState) => !prevState)}>
                        {options.get(selectState)?.name ?? "Выбор"}
                    </Button>
                }
                popup={
                    <ListBox
                        options={options}
                        clickListener={listboxClickListener}
                        select={selectState}
                    />
                }
                isOpen={isOpenState}
            />
        </div>
    );
}
