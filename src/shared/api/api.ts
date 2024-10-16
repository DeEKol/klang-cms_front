/*
 * Функция для получения данных
 */
export async function fetchData<T>(endpoint: string): Promise<T> {
    const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
    const options: RequestInit = {
        method: "GET", // * Или POST/PUT/DELETE, если нужно
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.API_KEY}`, // * Если требуется ключ API
        },
    };

    try {
        const response = await fetch(url, options);

        // * Проверяем, успешен ли запрос
        if (!response.ok) {
            // * Обрабатываем возможные ошибки
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        // * Парсим и возвращаем JSON
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Произошла ошибка:", error.message);
        } else {
            console.error("Произошла неизвестная ошибка:", error);
        }
        throw error; // * Пробрасываем ошибку дальше
    }
}
