// ? Library Imports
import { Navigate, Outlet } from "react-router";
// ? Layer Imports
import { isAuthenticated } from "shared/lib/auth";

/*
 * Защищённый маршрут — редиректит на /sign-in если токен отсутствует или истёк
 */
export function ProtectedRoute() {
    if (!isAuthenticated()) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
