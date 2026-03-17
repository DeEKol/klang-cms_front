import { pageApi } from "entities/page";
import { TPage } from "entities/lesson";

export const pageController = {
    save: async (lessonId: string, text: string, pageNumber: number) =>
        await pageApi.create({
            lessonId: lessonId,
            text: text,
            pageNumber: pageNumber,
        }),
    update: async (lessonId: string, id: string, text: string, pageNumber: number) =>
        await pageApi.update({ id }, { id, lessonId, text, pageNumber }),
    delete: async (id: string) => await pageApi.delete({ id }),
    cancel: (pageDefault: TPage): TPage => pageDefault,
};
