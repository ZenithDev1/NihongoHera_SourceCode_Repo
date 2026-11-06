import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flame, BrainCircuit, Trophy, AlertTriangle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { quizService } from "../services/quizService";
import HeatmapGrid from "../components/HeatmapGrid";

export default function DashboardPage() {
    const { user, guestAttempts } = useAuth();
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (user) {
            quizService
                .fetchDashboard()
                .then(setSummary)
                .catch(() => {});
        }
    }, [user]);

    // Build stats lookup map from either backend or guest localStorage attempts
    const statsMap = {};
    if (summary?.heatmapStats) {
        summary.heatmapStats.forEach((s) => {
            statsMap[s.characterSymbol] = s;
        });
    } else {
        guestAttempts.forEach((att) => {
            const existing = statsMap[att.characterSymbol] || {
                correctCount: 0,
                wrongCount: 0,
                masteryScore: 30
            };
            if (att.correct) {
                existing.correctCount += 1;
                existing.masteryScore = Math.min(100, existing.masteryScore + 20);
            } else {
                existing.wrongCount += 1;
                existing.masteryScore = Math.max(0, existing.masteryScore - 20);
            }
            statsMap[att.characterSymbol] = existing;
        });
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Current Streak</span>
                        <Flame className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="mt-2 text-3xl font-black text-white">
                        {summary?.currentStreak ?? (guestAttempts.length > 0 ? 1 : 0)} Days
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                        Max Record: {summary?.maxStreak ?? 1} Days
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Mastered (Dark Green)</span>
                        <Trophy className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="mt-2 text-3xl font-black text-emerald-400">
                        {summary?.totalMasteredCount ??
                            Object.values(statsMap).filter((s) => s.masteryScore >= 75).length}{" "}
                        / 92
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">30% SRS maintenance weight</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Weak / Confusion Pool</span>
                        <AlertTriangle className="h-5 w-5 text-rose-400" />
                    </div>
                    <div className="mt-2 text-3xl font-black text-rose-400">
                        {summary?.totalWeakCount ??
                            Object.values(statsMap).filter((s) => s.masteryScore < 45).length}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">70% SRS priority weight</p>
                </div>

                <div className="rounded-2xl border border-teal-500/40 bg-gradient-to-br from-teal-950/80 to-slate-900 p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-teal-300 font-bold">
                        <span>Smart 70/30 SRS Queue</span>
                        <BrainCircuit className="h-5 w-5 text-teal-400" />
                    </div>
                    <p className="text-xs text-slate-300 my-2">
                        70% weak characters + 30% mastered review.
                    </p>
                    <Link
                        to="/"
                        className="rounded-xl bg-teal-500 py-2 text-center text-xs font-bold text-slate-950 hover:bg-teal-400 transition"
                    >
                        Start Daily SRS Session →
                    </Link>
                </div>
            </div>

            {/* 92-Character Mastery Heatmap */}
            <HeatmapGrid statsMap={statsMap} />
        </div>
    );
}