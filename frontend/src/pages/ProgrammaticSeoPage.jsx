import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, PenTool } from "lucide-react";
import { KANA_CATALOG, ROW_MICRO_WORDS } from "../data/kanaCatalog";
import MnemonicCard from "../components/MnemonicCard";
import AudioPlayer from "../components/AudioPlayer";

export default function ProgrammaticSeoPage() {
    const { script, romaji } = useParams();

    const character =
        KANA_CATALOG.find(
            (k) =>
                k.script.toLowerCase() === (script || "hiragana").toLowerCase() &&
                k.romaji.toLowerCase() === (romaji || "ko").toLowerCase()
        ) || KANA_CATALOG[9];

    const exampleWords = ROW_MICRO_WORDS[character.row] || ROW_MICRO_WORDS.KA;

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
            <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:underline"
            >
                <ArrowLeft className="h-4 w-4" /> Back to 92-Character Heatmap
            </Link>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                    How to Write & Pronounce {character.script} "{character.symbol}" ({character.romaji.toUpperCase()}) — Hindi Hint: {character.devanagari}
                </h1>
                <p className="mt-2 text-xs text-slate-400">
                    JLPT N5 Programmatic Guide • {character.row}-Row ({character.variation})
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MnemonicCard kana={character} />

                    {/* Stroke Order Diagram Placeholder */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <PenTool className="h-4 w-4 text-teal-400" /> Stroke Order Practice Grid
              </span>
                            <AudioPlayer label="Hear Sound" />
                        </div>

                        <div className="my-4 flex items-center justify-center">
                            <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900">
                                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-800" />
                                <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-800" />
                                <span className="relative text-7xl font-black text-teal-400/90">
                  {character.symbol}
                </span>
                            </div>
                        </div>

                        <p className="text-[11px] text-slate-400 text-center">
                            Follow top-to-bottom, left-to-right Japanese brush stroke order inside the quadrant grid.
                        </p>
                    </div>
                </div>

                {/* 3 Real Example Words */}
                <div className="mt-8">
                    <h2 className="text-lg font-bold text-white mb-3">
                        3 Beginner Vocabulary Words Using {character.row}-Row Kana
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {exampleWords.map((w, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="text-2xl font-black text-white">{w.kana}</div>
                                    <div className="text-sm font-bold text-teal-400">{w.romaji}</div>
                                    <div className="text-xs text-indigo-300 mt-0.5">Hindi: {w.hindi}</div>
                                    <div className="text-xs text-slate-400 mt-1">{w.meaning}</div>
                                </div>
                                <div className="mt-3">
                                    <AudioPlayer label="Listen" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}