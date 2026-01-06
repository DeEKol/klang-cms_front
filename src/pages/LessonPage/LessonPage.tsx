// ? Library Imports
import { useEffect, useState } from "react";
// ? Layer Imports
import { Layout } from "widgets/Layout";
import { lessonApi } from "entities/lesson";
import { TGetSectionAllResponse } from "entities/lesson/LessonModel";
import { Title } from "shared/ui/atoms/Title";
import { TreeView, TTreeViewModel } from "shared/ui/molecules/TreeView";

// ? Types
type TSectionAll = TGetSectionAllResponse;

/*
 * Компонент, страница уроков
 */
export function LessonPage() {
    // ? React Variables
    const [sectionAllState, setSectionAllState] = useState<TSectionAll | undefined>(undefined);

    // ? Requests
    async function fetchSections() {
        return await lessonApi.getSectionAll();
    }

    // ? Life Cycles
    useEffect(() => {
        // ! Request
        // ! React
        fetchSections().then((data) => setSectionAllState(data));
    }, []);

    // ? Utils
    function mapToTreeView(sectionAll: TSectionAll): TTreeViewModel {
        return sectionAll.reduce((accSection, currSection) => {
            return {
                ...accSection,
                [currSection.id]: {
                    id: currSection.id,
                    title: currSection.text,
                    items: currSection.lessons.reduce((accLesson, currLesson) => {
                        return {
                            ...accLesson,
                            [currLesson.id]: {
                                id: currLesson.id,
                                title: currLesson.text,
                                linkTo: currLesson.id,
                            },
                        };
                    }, {}),
                },
            };
        }, {});
    }

    // ? Render
    return (
        <Layout>
            <Title>Уроки</Title>
            {sectionAllState ? (
                <TreeView model={mapToTreeView(sectionAllState)} />
            ) : (
                <p>Загрузка...</p>
            )}
        </Layout>
    );
}
