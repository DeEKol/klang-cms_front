import { paths, fetchData, fetchPostData, fetchPatchData } from "shared/api";
import { trimPathParam } from "shared/lib/url";

const createEndpoint = "/cms/pages";
export type TPageResponse =
    paths[typeof createEndpoint]["post"]["responses"]["201"]["content"]["application/json"];
type TCreateRequestBody =
    paths[typeof createEndpoint]["post"]["requestBody"]["content"]["application/json"];

const baseEndpoint = "/cms/pages/{id}";
type TUpdateRequestBody =
    paths[typeof baseEndpoint]["patch"]["requestBody"]["content"]["application/json"];
type TUpdateRequestPath = paths[typeof baseEndpoint]["patch"]["parameters"]["path"];
type TUpdateResponse =
    paths[typeof baseEndpoint]["patch"]["responses"]["200"]["content"]["application/json"];
type TDeleteRequestPath = paths[typeof baseEndpoint]["delete"]["parameters"]["path"];
type TDeleteResponse =
    paths[typeof baseEndpoint]["delete"]["responses"]["200"]["content"]["application/json"];

export const pageApi = {
    create: async (body: TCreateRequestBody): Promise<TPageResponse> =>
        await fetchPostData(createEndpoint, body),
    update: async (path: TUpdateRequestPath, body: TUpdateRequestBody): Promise<TUpdateResponse> =>
        await fetchPatchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, body),
    delete: async (path: TDeleteRequestPath): Promise<TDeleteResponse> =>
        await fetchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, "DELETE"),
};
