type THttpMethod = "GET" | "DELETE" | "POST" | "PUT";

/*
 * Функция для получения данных
 */
export async function fetchData<T>(endpoint: string, method: THttpMethod = "GET"): Promise<T> {
    const url = import.meta.env.VITE_API_URL + endpoint;

    console.log(url);

    const options: RequestInit = {
        method: method, // * Или POST/PUT/DELETE, если нужно
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.API_KEY}`, // * Если требуется ключ API
        },
    };

    try {
        return fetchWithError(url, options);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Произошла ошибка:", error.message);
        } else {
            console.error("Произошла неизвестная ошибка:", error);
        }
        throw error; // * Пробрасываем ошибку дальше
    }
}

/*
 * Функция для получения данных
 */
export async function fetchPostData<T>(endpoint: string, body: { text: string }): Promise<T> {
    console.log(body);
    const url = import.meta.env.VITE_API_URL + endpoint;
    const options: RequestInit = {
        method: "POST", // * Или POST/PUT/DELETE, если нужно
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.API_KEY}`, // * Если требуется ключ API
        },
        body: JSON.stringify(body),
    };

    try {
        return fetchWithError(url, options);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Произошла ошибка:", error.message);
        } else {
            console.error("Произошла неизвестная ошибка:", error);
        }
        throw error; // * Пробрасываем ошибку дальше
    }
}

async function fetchWithError(url: string, options: RequestInit) {
    const response = await fetch(url, options);
    // * Обрабатываем возможные ошибки
    if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    // * Парсим и возвращаем JSON
    else return await response.json();
}
