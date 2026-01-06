// ? Library Imports
import React, { useEffect, useState } from "react";
// ? Layer Imports
import { pageController } from "features/lesson";
import { TPage, TPageOption } from "entities/lesson";
import { Title } from "shared/ui/atoms/Title";
import { Button } from "shared/ui/atoms/Button";
// ? Slice Imports
import styles from "./LessonEditor.module.css";

// ? Types
type TLessonEditorProps = {
    id: string;
    page: TPage;
    options: TPageOption | undefined;
    refetchLessonsListener: () => void;
};

export function LessonEditor(props: TLessonEditorProps) {
    // ? Props From
    const { id, page: pageDefault, options, refetchLessonsListener } = props;

    // ! React
    const [pageState, setPageState] = useState(pageDefault);

    // // ? Life Cycles
    useEffect(() => {
        setPageState(pageDefault);
    }, [pageDefault]);

    // ? Handlers
    const handlers = {
        onClickSave: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            await pageController.save(id, pageState?.text, pageState?.pageNumber);
            refetchLessonsListener();
        },
        onClickUpdate: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            await pageController.update(id, pageState.id, pageState?.text, pageState?.pageNumber);
            refetchLessonsListener();
        },
        onClickDelete: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            await pageController.delete(pageState.id);
            refetchLessonsListener();
        },
        onClickCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            setPageState(pageController.cancel(pageDefault)),
        onChangeTextarea: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPageState((prevState) => {
                return { ...prevState, text: e.target.value };
            }),
    };

    // ? UI
    const Buttons = {
        create: (
            <Button key="create" variant="accept" onClick={handlers.onClickSave}>
                Добавить
            </Button>
        ),
        update: (
            <Button key="update" variant="alter" onClick={handlers.onClickUpdate}>
                Изменить
            </Button>
        ),
        delete: (
            <Button key="delete" variant="delete" onClick={handlers.onClickDelete}>
                Удалить
            </Button>
        ),
        cancel: (
            <Button key="cancel" variant="cancel" onClick={handlers.onClickCancel}>
                Отменить
            </Button>
        ),
    };

    // ? Render
    return (
        options && (
            <div className={styles.LessonEditor}>
                <div className={styles.titleBlock}>
                    <Title>Page {pageState.pageNumber}</Title>
                    {options.isDeleted && Buttons.delete}
                </div>
                <textarea
                    style={{ width: 375, height: 667 }}
                    name={pageState.pageNumber.toString()}
                    value={pageState.text}
                    onChange={handlers.onChangeTextarea}
                ></textarea>

                {options.buttonsBlock && (
                    <div className={styles.buttonsBlock}>
                        {options.buttonsBlock.map((name) => Buttons[name])}
                    </div>
                )}
            </div>
        )
    );
}
