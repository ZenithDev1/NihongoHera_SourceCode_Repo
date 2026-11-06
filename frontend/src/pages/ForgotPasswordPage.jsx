import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.forgotPassword({ email, newPassword });
            setStatus(res.message);
        } catch (err) {
            setStatus(err.response?.data?.message || "Error resetting password.");
        }
    };

    return (
        <div className="mx-auto max-w-md px-4 py-14">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                <h1 className="text-2xl font-black text-white">Reset Password</h1>
                {status && (
                    <div className="mt-4 rounded-xl bg-teal-500/15 border border-teal-500/40 p-3 text-xs text-teal-300">
                        {status}
                    </div>
                )}
                <form onSubmit={handleReset} className="mt-5 space-y-4">
                    <input
                        type="email"
                        required
                        placeholder="Registered Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                    />
                    <input
                        type="password"
                        required
                        minLength={6}
                        placeholder="New Password (min 6 chars)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-teal-500 py-3 text-sm font-bold text-slate-950"
                    >
                        Update Password
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-xs text-teal-400 font-bold">
                        ← Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}