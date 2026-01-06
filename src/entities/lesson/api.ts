import { paths, fetchData, fetchPostData } from "shared/api";

const findOneEndpoint = "/lesson/get/{id}";
type TFindOneResponse =
    paths[typeof findOneEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
type TFindOneRequestPath = paths[typeof findOneEndpoint]["get"]["parameters"]["path"];

export type TLessonOnePersist = TFindOneResponse;
export type TLessonOneEntity = TLessonOnePersist;

const createEndpoint = "/lesson/create";
type TCreateResponse =
    paths[typeof createEndpoint]["post"]["responses"]["200"]["content"]["application/json"];
type TCreateRequestBody =
    paths[typeof createEndpoint]["post"]["requestBody"]["content"]["application/json"];

const updateEndpoint = "/lesson/update";
type TUpdateResponse =
    paths[typeof updateEndpoint]["post"]["responses"]["200"]["content"]["application/json"];
type TUpdateRequestBody =
    paths[typeof updateEndpoint]["post"]["requestBody"]["content"]["application/json"];

const deleteEndpoint = "/lesson/delete/{id}";
type TDeleteResponse =
    paths[typeof deleteEndpoint]["delete"]["responses"]["200"]["content"]["application/json"];
type TDeleteRequestPath = paths[typeof deleteEndpoint]["delete"]["parameters"]["path"];

const getLessonEndpoint = "/lesson/get/{id}";
export type TGetLessonResponse =
    paths[typeof getLessonEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
type TGetLessonRequestPath = paths[typeof getLessonEndpoint]["get"]["parameters"]["path"];

const getSectionAllEndpoint = "/section/find-all";
export type TGetSectionAllResponse =
    paths[typeof getSectionAllEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
// type TGetSectionAllRequestPath = paths[typeof getSectionAllEndpoint]["get"]["parameters"]["path"];

const pageCreateEndpoint = "/page/create";
export type TPageCreateResponse =
    paths[typeof pageCreateEndpoint]["post"]["responses"]["200"]["content"]["application/json"];
type TPageCreateRequestBody =
    paths[typeof pageCreateEndpoint]["post"]["requestBody"]["content"]["application/json"];

const pageUpdateEndpoint = "/page/update";
export type TPageUpdateResponse =
    paths[typeof pageUpdateEndpoint]["post"]["responses"]["200"]["content"]["application/json"];
type TPageUpdateRequestBody =
    paths[typeof pageUpdateEndpoint]["post"]["requestBody"]["content"]["application/json"];

const pageDeleteEndpoint = "/page/delete/{id}";
export type TPageDeleteResponse =
    paths[typeof pageDeleteEndpoint]["delete"]["responses"]["200"]["content"]["application/json"];
type TPageDeleteRequestPath = paths[typeof pageDeleteEndpoint]["delete"]["parameters"]["path"];

function trimEnd(str: string, suffix: string) {
    if (str.endsWith(suffix)) {
        return str.slice(0, -suffix.length);
    }
    return str;
}

export const lessonApi = {
    // getAll: async () => await fetchData<TFindAllResponse>(findAllEndpoint),
    getOne: async (path: TFindOneRequestPath) =>
        await fetchData<TFindOneResponse>(`${trimEnd(findOneEndpoint, "{id}")}${path.id}`),
    create: async (body: TCreateRequestBody) =>
        await fetchPostData<TCreateResponse>(createEndpoint, body),
    update: async (body: TUpdateRequestBody) =>
        await fetchPostData<TUpdateResponse>(updateEndpoint, body),
    delete: async (path: TDeleteRequestPath) => {
        await fetchData<TDeleteResponse>(`${trimEnd(deleteEndpoint, "{id}")}${path.id}`, "DELETE");
    },

    getLesson: async (path: TGetLessonRequestPath): Promise<TGetLessonResponse> =>
        await fetchData(`${trimEnd(getLessonEndpoint, "{id}")}${path.id}`),
    getSectionAll: async (): Promise<TGetSectionAllResponse> =>
        await fetchData(getSectionAllEndpoint),
    pageCreate: async (body: TPageCreateRequestBody): Promise<TPageCreateResponse> =>
        await fetchPostData(pageCreateEndpoint, body),
    pageUpdate: async (body: TPageUpdateRequestBody): Promise<TPageUpdateResponse> =>
        await fetchPostData(pageUpdateEndpoint, body),
    pageDelete: async (path: TPageDeleteRequestPath): Promise<TPageDeleteResponse> =>
        await fetchData(`${trimEnd(pageDeleteEndpoint, "{id}")}${path.id}`, "DELETE"),
};
