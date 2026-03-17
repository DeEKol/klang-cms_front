// ? Library Imports
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
// ? Layer Imports
import { clearTokens, isAuthenticated, refreshAccessToken } from "shared/lib/auth";

type TAuthStatus = "checking" | "ok" | "fail";

/*
 * Защищённый маршрут — при истёкшем токене пробует refresh через httpOnly cookie.
 * Редиректит на /sign-in только если refresh не удался.
 */
export function ProtectedRoute() {
    const [status, setStatus] = useState<TAuthStatus>(isAuthenticated() ? "ok" : "checking");

    useEffect(() => {
        if (status !== "checking") return;

        refreshAccessToken().then((ok) => {
            if (ok) {
                setStatus("ok");
            } else {
                clearTokens();
                setStatus("fail");
            }
        });
    }, [status]);

    if (status === "checking") return null;
    if (status === "fail") return <Navigate to="/sign-in" replace />;
    return <Outlet />;
}
