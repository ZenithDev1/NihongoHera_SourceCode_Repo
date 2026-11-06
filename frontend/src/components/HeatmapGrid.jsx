import React, { useState } from "react";
import { Link } from "react-router-dom";
import { KANA_CATALOG } from "../data/kanaCatalog";
import { useAuth } from "../context/AuthContext";

export default function HeatmapGrid({ statsMap = {} }) {
    const [activeTab, setActiveTab] = useState("HIRAGANA");
    const { showDevanagari } = useAuth();

    const characters = KANA_CATALOG.filter(
        (c) => c.script === activeTab && c.variation === "GOJUON"
    );

    const getBucketStyle = (symbol) => {
        const stat = statsMap[symbol];
        if (!stat) return "bg-slate-900 border-slate-800 text-slate-300 hover:border-teal-500/50";
        if (stat.masteryScore >= 75) {
            return "bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-sm shadow-emerald-950";
        }
        if (stat.masteryScore < 45 || stat.wrongCount > stat.correctCount) {
            return "bg-rose-950/80 border-rose-500/60 text-rose-200";
        }
        return "bg-amber-950/70 border-amber-500/50 text-amber-200";
    };

    return (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Visual Kana Mastery Heatmap (46 + 46)</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Click any character to inspect stroke order, mnemonics, and JLPT N5 micro-words.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
                    {["HIRAGANA", "KATAKANA"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                                activeTab === tab
                                    ? "bg-teal-500 text-slate-950"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            {tab} (46)
                        </button>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-emerald-600 inline-block"></span> Mastered (Dark Green)
        </span>
                <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-amber-500 inline-block"></span> In Progress (Amber)
        </span>
                <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-rose-600 inline-block"></span> Needs Drill (Red)
        </span>
                <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-slate-800 border border-slate-700 inline-block"></span> Unseen
        </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
                {characters.map((item) => {
                    const stat = statsMap[item.symbol];
                    return (
                        <Link
                            key={item.id}
                            to={`/learn/${item.script.toLowerCase()}/${item.romaji}`}
                            className={`group relative flex flex-col items-center justify-center rounded-xl border p-3 transition transform hover:-translate-y-0.5 ${getBucketStyle(
                                item.symbol
                            )}`}
                        >
                            <span className="text-2xl font-black">{item.symbol}</span>
                            <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                {item.romaji}
              </span>
                            {showDevanagari && (
                                <span className="text-[10px] text-indigo-300/90 mt-0.5 truncate max-w-full">
                  {item.devanagari.split(" ")[0]}
                </span>
                            )}
                            {stat && (
                                <span className="mt-1 text-[9px] font-mono opacity-75">
                  {stat.masteryScore}%
                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}