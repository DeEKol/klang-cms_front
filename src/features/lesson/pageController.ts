import { lessonApi, TPage } from "entities/lesson";

export const pageController = {
    save: async (lessonId: string, text: string, pageNumber: number) =>
        await lessonApi.pageCreate({
            lessonId: lessonId,
            text: text,
            pageNumber: pageNumber,
        }),
    update: async (lessonId: string, id: string, text: string, pageNumber: number) =>
        await lessonApi.pageUpdate({
            lessonId: lessonId,
            id: id,
            text: text,
            pageNumber: pageNumber,
        }),
    delete: async (id: string) => await lessonApi.pageDelete({ id }),
    cancel: (pageDefault: TPage): TPage => pageDefault,
};
