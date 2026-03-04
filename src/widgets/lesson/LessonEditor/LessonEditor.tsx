// ? Library Imports
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// ? Layer Imports
import { pageController } from "features/lesson";
import { TPage, TPageOption } from "entities/lesson";
import { Title } from "shared/ui/atoms/Title";
import { Button } from "shared/ui/atoms/Button";
import { ChevronSvg } from "shared/ui/molecules/ChevronTrigger";
// ? Slice Imports
import styles from "./LessonEditor.module.css";

// ? Types
type TLessonEditorProps = {
    id: string;
    page: TPage;
    options: TPageOption | undefined;
    refetchLessonsListener: () => void;
    size?: { width: number; height: number };
};

/*
 * Компонент Редактирование урока
 */
export function LessonEditor(props: TLessonEditorProps) {
    // ? Props From
    const {
        id,
        page: pageDefault,
        options,
        refetchLessonsListener,
        size = { width: 375, height: 667 },
    } = props;

    // ! React
    const [pageState, setPageState] = useState(pageDefault);
    const [isCollapsedState, setIsCollapsedState] = useState(false);

    // ? Life Cycles
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
        onClickCollapse: () => setIsCollapsedState((prev) => !prev),
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
        collapse: (
            <Button key="collapse" variant="ghost" onClick={handlers.onClickCollapse}>
                <ChevronSvg isOpen={!isCollapsedState} />
            </Button>
        ),
    };

    // ? Render
    return (
        options && (
            <div className={styles.LessonEditor}>
                <div className={styles.titleBlock}>
                    <div className={styles.titleName}>
                        <Title>Страница {pageState.pageNumber}</Title>
                        {Buttons.collapse}
                    </div>
                    <div className={styles.titleActions}>{options.isDeleted && Buttons.delete}</div>
                </div>
                {!isCollapsedState && (
                    <>
                        <div className={styles.editorRow}>
                            <textarea
                                style={
                                    {
                                        "--area-width": size.width + "px",
                                        "--area-height": size.height + "px",
                                    } as React.CSSProperties
                                }
                                className={styles.area}
                                name={pageState.pageNumber.toString()}
                                value={pageState.text}
                                onChange={handlers.onChangeTextarea}
                            ></textarea>
                            <div
                                style={{ width: size.width, height: size.height }}
                                className={styles.preview}
                            >
                                <ReactMarkdown>{pageState.text}</ReactMarkdown>
                            </div>
                        </div>
                        {options.buttonsBlock && (
                            <div className={styles.buttonsBlock}>
                                {options.buttonsBlock.map((name) => Buttons[name])}
                            </div>
                        )}
                    </>
                )}
            </div>
        )
    );
}
