import { paths, fetchData, fetchPostData, fetchPatchData } from "shared/api";
import { trimPathParam } from "shared/lib/url";

const findAllEndpoint = "/cms/sections";
export type TSectionFindAllResponse =
    paths[typeof findAllEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
type TCreateRequestBody =
    paths[typeof findAllEndpoint]["post"]["requestBody"]["content"]["application/json"];
type TCreateResponse =
    paths[typeof findAllEndpoint]["post"]["responses"]["201"]["content"]["application/json"];

const baseEndpoint = "/cms/sections/{id}";
export type TSectionResponse =
    paths[typeof baseEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
type TFindOneRequestPath = paths[typeof baseEndpoint]["get"]["parameters"]["path"];
type TUpdateRequestBody =
    paths[typeof baseEndpoint]["patch"]["requestBody"]["content"]["application/json"];
type TUpdateRequestPath = paths[typeof baseEndpoint]["patch"]["parameters"]["path"];
type TUpdateResponse =
    paths[typeof baseEndpoint]["patch"]["responses"]["200"]["content"]["application/json"];
type TDeleteRequestPath = paths[typeof baseEndpoint]["delete"]["parameters"]["path"];
type TDeleteResponse =
    paths[typeof baseEndpoint]["delete"]["responses"]["200"]["content"]["application/json"];

export const sectionApi = {
    findAll: async (): Promise<TSectionFindAllResponse> => await fetchData(findAllEndpoint),
    findOne: async (path: TFindOneRequestPath): Promise<TSectionResponse> =>
        await fetchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`),
    create: async (body: TCreateRequestBody): Promise<TCreateResponse> =>
        await fetchPostData(findAllEndpoint, body),
    update: async (path: TUpdateRequestPath, body: TUpdateRequestBody): Promise<TUpdateResponse> =>
        await fetchPatchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, body),
    delete: async (path: TDeleteRequestPath): Promise<TDeleteResponse> =>
        await fetchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, "DELETE"),
};
