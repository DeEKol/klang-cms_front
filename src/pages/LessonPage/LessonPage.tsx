// ? Library Imports
import { useEffect, useState } from "react";
// ? Layer Imports
import { Layout } from "widgets/Layout";
import { sectionApi, TSectionFindAllResponse } from "entities/section";
import { Title } from "shared/ui/atoms/Title";
import { TreeView, TTreeViewModel, TInnerModel } from "shared/ui/molecules/TreeView";
// ? Slice Imports
import styles from "./LessonPage.module.css";

// ? Types
type TSectionAll = TSectionFindAllResponse;

/*
 * Компонент, страница уроков
 */
export function LessonPage() {
    // ? React Variables
    const [sectionAllState, setSectionAllState] = useState<TSectionAll | undefined>(undefined);

    // ? Requests
    async function fetchSections() {
        return await sectionApi.findAll();
    }

    // ? Life Cycles
    useEffect(() => {
        // ! Request
        // ! React
        fetchSections().then((data) => setSectionAllState(data));
    }, []);

    // ? Utils
    function mapToTreeView(sectionAll: TSectionAll): TTreeViewModel {
        return sectionAll.reduce((acc: TTreeViewModel, section: TSectionAll[number]) => {
            const items = section.lessons.reduce(
                (
                    accL: Record<string, TInnerModel>,
                    lesson: TSectionAll[number]["lessons"][number],
                ) => ({
                    ...accL,
                    [lesson.id]: { id: lesson.id, title: lesson.text, linkTo: lesson.id },
                }),
                {},
            );
            return { ...acc, [section.id]: { id: section.id, title: section.text, items } };
        }, {});
    }

    // ? Render
    return (
        <Layout>
            <div className={styles.pageHeader}>
                <Title>Уроки</Title>
            </div>
            <div className={styles.content}>
                {sectionAllState ? (
                    <TreeView model={mapToTreeView(sectionAllState)} />
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </Layout>
    );
}
