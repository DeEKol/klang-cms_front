export type TPage = { id: string; text: string; pageNumber: number };

type TLessonButtonAlias = "create" | "update" | "delete" | "cancel";
export type TPageOption = {
    isDeleted: boolean;
    buttonsBlock: [TLessonButtonAlias, TLessonButtonAlias];
};

export type TPagesModel = Map<string, TPage>;
export type TPagesOptions = Map<string, TPageOption>;

export function toPagesModel(pages: TPage[]): [TPagesModel, TPagesOptions] {
    const pageCurr = [...pages, { id: "", text: "", pageNumber: pages.length + 1 }];

    return pageCurr.reduce(
        (acc, curr) => {
            return [
                acc[0].set(curr.id, curr),
                acc[1].set(curr.id, {
                    isDeleted: curr.pageNumber === pages.length,
                    buttonsBlock: [curr.id === "" ? "create" : "update", "cancel"],
                }),
            ];
        },
        [new Map<string, TPage>(), new Map<string, TPageOption>()],
    );
}
