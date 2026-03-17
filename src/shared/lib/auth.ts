const ACCESS_TOKEN_KEY = "accessToken";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
        const payload = token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

function isTokenExpired(token: string): boolean {
    const payload = decodeJwtPayload(token);
    if (!payload || typeof payload.exp !== "number") return true;
    return payload.exp * 1000 < Date.now();
}

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
    const token = getAccessToken();
    if (!token) return false;
    return !isTokenExpired(token);
}

export function saveTokens(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}
