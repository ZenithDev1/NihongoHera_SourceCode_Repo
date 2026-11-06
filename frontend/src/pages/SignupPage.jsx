import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
    const { guestAttempts, authenticateUser } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await authService.signup({
                username,
                email,
                password,
                preferDevanagari: true
            });
            await authenticateUser(res);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Could not create account.");
        }
    };

    return (
        <div className="mx-auto max-w-md px-4 py-12">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                <h1 className="text-2xl font-black text-white">Save Your Diamond Streak</h1>
                <p className="text-xs text-slate-400 mt-1">
                    {guestAttempts.length > 0
                        ? `Your ${guestAttempts.length} guest practice attempts will be synced automatically!`
                        : "Unlock smart 70/30 Spaced Repetition and your 92-character Mastery Heatmap."}
                </p>

                {error && (
                    <div className="mt-4 rounded-xl bg-rose-500/15 border border-rose-500/40 p-3 text-xs text-rose-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                            Password (BCrypt Encrypted)
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-teal-500 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400 transition"
                    >
                        Sign Up & Sync Progress
                    </button>
                </form>

                <p className="mt-5 text-center text-xs text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-400 font-bold">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}