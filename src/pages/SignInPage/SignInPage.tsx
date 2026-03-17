// ? Library Imports
import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router";
// ? Layer Imports
import { workerApi } from "entities/worker";
import { isAuthenticated, saveTokens } from "shared/lib/auth";
// ? Slice Imports
import styles from "./SignInPage.module.css";

/*
 * Страница входа для воркеров
 */
export function SignInPage() {
    if (isAuthenticated()) return <Navigate to="/" replace />;

    // ? React Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // ? Handlers
    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await workerApi.signIn({ email, password });
            saveTokens(response.accessToken);
            navigate("/");
        } catch {
            setError("Неверный email или пароль");
        } finally {
            setLoading(false);
        }
    }

    // ? Render
    return (
        <div className={styles.root}>
            <div className={styles.card}>
                <h1 className={styles.title}>Вход в систему</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            className={styles.input}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">
                            Пароль
                        </label>
                        <input
                            id="password"
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button className={styles.submit} type="submit" disabled={loading}>
                        {loading ? "Вход..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
}
