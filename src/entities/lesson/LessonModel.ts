import { fetchData } from "../../shared/api";
import { fetchPostData } from "../../shared/api/api";
import { paths } from "../../shared/api/typesApi";

const findOneEndpoint = "/lesson/find/{id}";
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

const getLessonEndpoint = "/lesson/find/{id}";
export type TGetLessonResponse =
    paths[typeof getLessonEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
type TGetLessonRequestPath = paths[typeof getLessonEndpoint]["get"]["parameters"]["path"];

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
};
