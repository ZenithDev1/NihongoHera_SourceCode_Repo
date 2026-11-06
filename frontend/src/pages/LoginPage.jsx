import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { authenticateUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await authService.login({ emailOrUsername, password });
            await authenticateUser(res);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="mx-auto max-w-md px-4 py-14">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                <h1 className="text-2xl font-black text-white">Welcome Back</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Sign in to sync your 70/30 SRS queue and daily Kana streak.
                </p>

                {error && (
                    <div className="mt-4 rounded-xl bg-rose-500/15 border border-rose-500/40 p-3 text-xs text-rose-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            required
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-teal-500 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400 transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                    <Link to="/forgot-password" className="hover:text-teal-400">
                        Forgot Password?
                    </Link>
                    <Link to="/signup" className="text-teal-400 font-bold">
                        Create Free Account →
                    </Link>
                </div>
            </div>
        </div>
    );
}