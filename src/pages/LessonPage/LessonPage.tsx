// ? Library Imports
import { useEffect, useState } from "react";
// ? Layer Imports
import { Layout } from "widgets/Layout";
import { lessonApi } from "entities/lesson";
import { TGetSectionAllResponse } from "entities/lesson/LessonModel";
import { Title } from "shared/ui/atoms/Title";
import { TreeView } from "shared/ui/molecules/TreeView";
import { TTreeViewModel } from "../../shared/ui/molecules/TreeView/TreeView";

/*
 * Компонент, страница уроков
 */
export function LessonPage() {
    // ? React Variables
    const [sectionAllState, setSectionAllState] = useState<TGetSectionAllResponse>();

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
    function mapToTreeView(sectionAll: TGetSectionAllResponse): TTreeViewModel {
        return sectionAll.reduce((acc, curr) => {
            return {
                ...acc,
                [curr.id]: {
                    id: curr.id,
                    title: curr.text,
                    items: curr.lessons.reduce((acc, curr) => {
                        return {
                            ...acc,
                            [curr.id]: {
                                id: curr.id,
                                title: curr.text,
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
