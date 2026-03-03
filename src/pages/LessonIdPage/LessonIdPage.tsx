// ? Library Imports
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
// ? Layer Imports
import { Layout } from "widgets/Layout";
import { LessonEditor } from "widgets/lesson/LessonEditor";
import { lessonApi, TLesson, toPagesModel } from "entities/lesson";
import {
    convertStringToTPhoneModelsAlias,
    phoneSize,
    TPhoneModelsAlias,
    TSize,
} from "entities/phone";
import { Title } from "shared/ui/atoms/Title";
import { Breadcrumbs } from "shared/ui/atoms";
import { SelectorButtonListbox } from "shared/ui/organisms/SelectorButtonListbox";
import { TOption } from "shared/ui/molecules/ListBox";
// ? Slice Imports
import styles from "./LessonIdPage.module.css";

// ? Utils

/*
 * Компонент, страница уроков
 */
export function LessonIdPage() {
    const { id } = useParams();

    // ! React Variables
    const [lessonState, setLessonState] = useState<TLesson | undefined>(undefined);
    const [phoneSizeState, setPhoneSizeState] = useState<TSize>({ width: 412, height: 915 });

    // ? Requests
    async function fetchLesson(lessonId: string) {
        return await lessonApi.getLesson({ id: lessonId });
    }

    // ? Life Cycles
    useEffect(() => {
        // ! Request
        // ! React
        if (id) fetchLesson(id).then((data) => setLessonState(data));
    }, []);

    const refetchLessons = () => {
        if (id) fetchLesson(id).then((data) => setLessonState(data));
    };

    // ! Memo
    const pagesCortege = useMemo(
        () => lessonState && toPagesModel(lessonState.pages),
        [lessonState],
    );

    function phoneSizesToSelectorModel(
        sizes: Record<TPhoneModelsAlias, TSize>,
    ): Map<string | undefined, TOption> {
        return Object.entries(sizes).reduce((acc, [key, _size]) => {
            return acc.set(key, { name: key, value: key });
        }, new Map<string | undefined, TOption>());
    }

    // ? Render
    return lessonState && pagesCortege ? (
        <Layout>
            <div className={styles.pageHeader}>
                <Breadcrumbs
                    items={[
                        { label: "Уроки", to: "/lesson" },
                        { label: `Урок ${lessonState.text}` },
                    ]}
                />
                <div className={styles.pageHeaderRow}>
                    <Title>Урок {lessonState.text}</Title>
                    <SelectorButtonListbox
                        options={phoneSizesToSelectorModel(phoneSize)}
                        selectedKey={"Samsung Galaxy S24 Ultra"}
                        selectListener={(option) => {
                            if (option !== undefined)
                                setPhoneSizeState(
                                    phoneSize[
                                        convertStringToTPhoneModelsAlias(
                                            option?.value,
                                            "Samsung Galaxy S24 Ultra",
                                        )
                                    ],
                                );
                        }}
                    />
                </div>
            </div>
            <div className={styles.lessonsBlock}>
                {[...pagesCortege[0]].map(([key, page]) => (
                    <LessonEditor
                        key={key}
                        id={lessonState?.id}
                        page={page}
                        options={pagesCortege[1].get(key)}
                        refetchLessonsListener={refetchLessons}
                        size={phoneSizeState}
                    />
                ))}
            </div>
        </Layout>
    ) : (
        <Layout>
            <p>Loading!</p>
        </Layout>
    );
}
