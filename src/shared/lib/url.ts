/*
 * Обрезает суффикс из конца строки (используется для подстановки path-параметров)
 * Пример: trimPathParam("/lesson/get/{id}", "{id}") → "/lesson/get/"
 */
export function trimPathParam(endpoint: string, param: string): string {
    return endpoint.endsWith(param) ? endpoint.slice(0, -param.length) : endpoint;
}
