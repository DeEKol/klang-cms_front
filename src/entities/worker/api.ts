import { paths, fetchData, fetchPostData } from "shared/api";

const signInEndpoint = "/cms/workers/auth/sign-in";
type TSignInRequestBody =
    paths[typeof signInEndpoint]["post"]["requestBody"]["content"]["application/json"];
export type TSignInResponse =
    paths[typeof signInEndpoint]["post"]["responses"]["200"]["content"]["application/json"];

const refreshEndpoint = "/cms/workers/auth/refresh";
export type TRefreshResponse =
    paths[typeof refreshEndpoint]["post"]["responses"]["200"]["content"]["application/json"];

const createEndpoint = "/cms/workers";
type TCreateRequestBody =
    paths[typeof createEndpoint]["post"]["requestBody"]["content"]["application/json"];
export type TCreateWorkerResponse =
    paths[typeof createEndpoint]["post"]["responses"]["201"]["content"]["application/json"];

export const workerApi = {
    signIn: async (body: TSignInRequestBody): Promise<TSignInResponse> =>
        await fetchPostData(signInEndpoint, body),
    refresh: async (): Promise<TRefreshResponse> => await fetchData(refreshEndpoint, "POST"),
    create: async (body: TCreateRequestBody): Promise<TCreateWorkerResponse> =>
        await fetchPostData(createEndpoint, body),
};
