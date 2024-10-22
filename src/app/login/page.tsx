"use client"; // Ensure this is a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("authToken", data.token);
                router.push("/");
            } else {
                setError(data.error || "Login failed. Please try again.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    // Professional inline CSS styles
    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f4f8",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        card: {
            backgroundColor: "#ffffff",
            padding: "40px 30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
        },
        header: {
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
            fontWeight: "bold",
        },
        form: {
            display: "flex",
            flexDirection: "column",
        },
        inputGroup: {
            marginBottom: "20px",
        },
        label: {
            marginBottom: "8px",
            fontSize: "14px",
            color: "#555",
        },
        input: {
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.3s ease",
        },
        inputFocus: {
            borderColor: "#0070f3",
        },
        button: {
            padding: "12px",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#005bb5",
        },
        error: {
            color: "red",
            marginBottom: "16px",
            textAlign: "center",
        },
        footerText: {
            textAlign: "center",
            marginTop: "16px",
            color: "#888",
            fontSize: "14px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Login
                    </button>
                </form>
                <p style={styles.footerText}>Don't have an account? Contact support.</p>
            </div>
        </div>
    );
};

export default LoginPage;
