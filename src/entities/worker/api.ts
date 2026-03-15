import { paths, fetchPostData } from "shared/api";

const signInEndpoint = "/workers/auth/sign-in";
type TSignInRequestBody =
    paths[typeof signInEndpoint]["post"]["requestBody"]["content"]["application/json"];
export type TSignInResponse =
    paths[typeof signInEndpoint]["post"]["responses"]["200"]["content"]["application/json"];

const createWorkerEndpoint = "/workers";
type TCreateWorkerRequestBody =
    paths[typeof createWorkerEndpoint]["post"]["requestBody"]["content"]["application/json"];
export type TCreateWorkerResponse =
    paths[typeof createWorkerEndpoint]["post"]["responses"]["201"]["content"]["application/json"];

export const workerApi = {
    signIn: async (body: TSignInRequestBody): Promise<TSignInResponse> =>
        await fetchPostData(signInEndpoint, body),
    create: async (body: TCreateWorkerRequestBody): Promise<TCreateWorkerResponse> =>
        await fetchPostData(createWorkerEndpoint, body),
};
