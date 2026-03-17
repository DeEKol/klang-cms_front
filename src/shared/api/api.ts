import { getAccessToken, refreshAccessToken } from "shared/lib/auth";

type THttpMethod = "GET" | "DELETE" | "POST" | "PUT" | "PATCH";

function buildHeaders(extra?: HeadersInit): HeadersInit {
    const token = getAccessToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extra,
    };
}

/*
 * Запрос без тела (GET, DELETE, POST без body)
 */
export async function fetchData<T>(endpoint: string, method: THttpMethod = "GET"): Promise<T> {
    const url = import.meta.env.VITE_API_URL + endpoint;
    const options: RequestInit = {
        method,
        headers: buildHeaders(),
        credentials: "include",
    };

    try {
        return fetchWithError(url, options);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Произошла ошибка:", error.message);
        } else {
            console.error("Произошла неизвестная ошибка:", error);
        }
        throw error;
    }
}

/*
 * Запрос с телом (POST)
 */
export async function fetchPostData<T>(endpoint: string, body: object): Promise<T> {
    const url = import.meta.env.VITE_API_URL + endpoint;
    const options: RequestInit = {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify(body),
        credentials: "include",
    };

    try {
        return fetchWithError(url, options);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Произошла ошибка:", error.message);
        } else {
            console.error("Произошла неизвестная ошибка:", error);
        }
        throw error;
    }
}

/*
 * Запрос с телом (PATCH)
 */
export async function fetchPatchData<T>(endpoint: string, body: object): Promise<T> {
    const url = import.meta.env.VITE_API_URL + endpoint;
    const options: RequestInit = {
        method: "PATCH",
        headers: buildHeaders(),
        body: JSON.stringify(body),
        credentials: "include",
    };

    try {
        return fetchWithError(url, options);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Произошла ошибка:", error.message);
        } else {
            console.error("Произошла неизвестная ошибка:", error);
        }
        throw error;
    }
}

async function fetchWithError(url: string, options: RequestInit) {
    const response = await fetch(url, options);

    if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            const retryOptions = { ...options, headers: buildHeaders() };
            const retryResponse = await fetch(url, retryOptions);
            if (!retryResponse.ok)
                throw new Error(`Ошибка: ${retryResponse.status} ${retryResponse.statusText}`);
            return retryResponse.json();
        }
        throw new Error("Unauthorized");
    }

    if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    return await response.json();
}
