import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Gem, Flame, Languages, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, showDevanagari, setShowDevanagari, guestAttempts, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Instant Drill" },
        { path: "/dashboard", label: "Heatmap & SRS" },
        { path: "/look-alikes", label: "Confusion Buster" },
        { path: "/katakana", label: "Katakana Hub" },
        { path: "/tools", label: "Free Tools & PDFs" }
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 shadow-lg shadow-teal-500/20">
                        <Gem className="h-5 w-5" />
                    </div>
                    <div>
            <span className="text-lg font-black tracking-tight text-white">
              Nihongo<span className="text-teal-400">Hera</span>
            </span>
                        <span className="block text-[10px] font-medium text-slate-400">
              Hiragana & Katakana Diamond Mastery
            </span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                                location.pathname === item.path
                                    ? "bg-teal-500/15 text-teal-300 border border-teal-500/30"
                                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Devanagari (Hindi) Toggle USP */}
                    <button
                        onClick={() => setShowDevanagari(!showDevanagari)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                            showDevanagari
                                ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-300"
                                : "border-slate-800 bg-slate-900 text-slate-400"
                        }`}
                        title="Toggle Devanagari (Hindi) phonetic hints for JLPT N5"
                    >
                        <Languages className="h-3.5 w-3.5" />
                        <span>अ/क Hindi: {showDevanagari ? "ON" : "OFF"}</span>
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-300">
                                <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <span>{user.currentStreak || 1}d</span>
                            </div>
                            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                {user.username}
              </span>
                            <button
                                onClick={logout}
                                className="rounded-lg bg-slate-900 p-2 text-slate-400 hover:text-rose-400 border border-slate-800"
                                title="Sign Out"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/signup"
                            className="rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400 transition shadow-lg shadow-teal-500/20"
                        >
                            {guestAttempts.length > 0
                                ? `Save Streak (${guestAttempts.length} drilled)`
                                : "Save Progress"}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}