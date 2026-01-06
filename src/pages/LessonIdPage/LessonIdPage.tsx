// ? Library Imports
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
// ? Layer Imports
import { Layout } from "widgets/Layout";
import { LessonEditor } from "widgets/lesson/LessonEditor";
import { lessonApi, TLesson, toPagesModel } from "entities/lesson";
import { Title } from "shared/ui/atoms/Title";
// ? Slice Imports
import styles from "./LessonIdPage.module.css";

// ? Utils

/*
 * Компонент, страница уроков
 */
export function LessonIdPage() {
    const { id } = useParams();

    // ? React Variables
    const [lessonState, setLessonState] = useState<TLesson | undefined>(undefined);

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

    // ? Render
    return lessonState && pagesCortege ? (
        <Layout>
            <Title>Урок {lessonState.text}</Title>
            <div className={styles.lessonsBlock}>
                {[...pagesCortege[0]].map(([key, page]) => (
                    <LessonEditor
                        key={key}
                        id={lessonState?.id}
                        page={page}
                        options={pagesCortege[1].get(key)}
                        refetchLessonsListener={refetchLessons}
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
