// ? Library Imports
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// ? Layer Imports
import { Layout } from "widgets/Layout";
import { lessonApi, TGetLessonResponse } from "entities/lesson";
import { Button } from "shared/ui/atoms/Button";
import { TextField } from "shared/ui/atoms/TextField";

/*
 * Компонент, главная cтраница
 */
export function HomePage() {
    const [lessonState, setLessonState] = useState<TGetLessonResponse>();

    async function fetchLesson(id: string): Promise<TGetLessonResponse> {
        return await lessonApi.getLesson({ id });
    }

    async function fetchFirstLesson(): Promise<TGetLessonResponse> {
        const sections = await lessonApi.getSectionAll();

        return await fetchLesson(sections[0].lessons[0].id).then();
    }

    useEffect(() => {
        fetchFirstLesson().then((data) => setLessonState(data));
    }, []);

    const onClickCreate = () => {
        lessonApi.create({ text: lessonState?.text ?? "" }).then((data) => console.log(data));
    };

    const onClickUpdate = async () => {
        const lesson = await lessonApi.update({
            id: lessonState?.id ?? "",
            text: lessonState?.text ?? "",
        });

        if (lesson) fetchFirstLesson().then((data) => setLessonState(data));
    };

    const onClickDelete = () => {
        lessonApi.delete({ id: "9" }).then((data) => console.log(data));
    };

    return (
        <Layout>
            <TextField
                onChange={(e) =>
                    setLessonState((prevState) => {
                        if (prevState !== null && prevState !== undefined)
                            return { ...prevState, text: e.target.value };
                    })
                }
                value={lessonState?.text}
            />
            <ReactMarkdown>{lessonState?.text}</ReactMarkdown>
            <Button onClick={onClickCreate}>Btn create</Button>
            <Button onClick={onClickUpdate}>Btn update</Button>
            <Button onClick={onClickDelete}>Btn delete</Button>
        </Layout>
    );
}
