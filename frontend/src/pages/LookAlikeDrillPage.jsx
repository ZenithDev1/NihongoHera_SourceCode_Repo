import React, { useState } from "react";
import { KANA_CATALOG } from "../data/kanaCatalog";
import AudioPlayer from "../components/AudioPlayer";
import { HighlightedMnemonic } from "../components/MnemonicCard";

const CONFUSION_CLUSTERS = [
    {
        code: "SA_KI",
        title: "Hiragana: さ (sa) vs き (ki)",
        tip: "Count the horizontal crossbars! さ (SA) has ONE bar; き (KI) has TWO bars like the teeth of a KEY."
    },
    {
        code: "WA_RE_NE",
        title: "Hiragana: わ (wa) vs れ (re) vs ね (ne)",
        tip: "All three start with the same left stem! わ curves smoothly inward (WAsp belly), れ kicks outward (REtired), and ね loops into a knot (NEko cat tail)."
    },
    {
        code: "RU_RO",
        title: "Hiragana: る (ru) vs ろ (ro)",
        tip: "る (RU) has a RUby ring loop at the bottom; ろ (RO) is a plain ROad turn with no loop."
    },
    {
        code: "SHI_TSU",
        title: "Katakana: シ (shi) vs ツ (tsu)",
        tip: "Look at the two small ticks! シ (SHI) aligns them horizontally on the left and sweeps UP; ツ (TSU) drops them vertically from the top and sweeps DOWN."
    },
    {
        code: "SO_N",
        title: "Katakana: ソ (so) vs ン (n)",
        tip: "ソ (SO) drops its top tick vertically and sweeps DOWN; ン (N) places a horizontal tick on the left and sweeps UP."
    }
];

export default function LookAlikeDrillPage() {
    const [selectedCluster, setSelectedCluster] = useState("SHI_TSU");
    const [quizIndex, setQuizIndex] = useState(0);
    const [score, setScore] = useState({ hits: 0, total: 0 });

    const clusterItems = KANA_CATALOG.filter((k) => k.lookAlike === selectedCluster);
    const activeTarget = clusterItems[quizIndex % clusterItems.length];

    const handlePick = (pickedRomaji) => {
        const isHit = pickedRomaji === activeTarget.romaji;
        setScore((s) => ({ hits: s.hits + (isHit ? 1 : 0), total: s.total + 1 }));
        setQuizIndex((i) => i + 1);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
            <div>
                <h1 className="text-2xl font-black text-white">
                    "Look-Alike" Confusion Buster Drills
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Eliminate the #1 cause of JLPT N5 reading mistakes by comparing notoriously similar Kana side by side.
                </p>
            </div>

            {/* Cluster Selector */}
            <div className="flex flex-wrap gap-2">
                {CONFUSION_CLUSTERS.map((c) => (
                    <button
                        key={c.code}
                        onClick={() => {
                            setSelectedCluster(c.code);
                            setQuizIndex(0);
                        }}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                            selectedCluster === c.code
                                ? "bg-teal-500 text-slate-950"
                                : "bg-slate-900 text-slate-300 border border-slate-800"
                        }`}
                    >
                        {c.title}
                    </button>
                ))}
            </div>

            {/* Side-by-Side Visual Breakdown */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200">
                <strong>⚡ Instant Visual Rule: </strong>
                {CONFUSION_CLUSTERS.find((c) => c.code === selectedCluster)?.tip}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clusterItems.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-6xl font-black text-white">{item.symbol}</span>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-teal-400">{item.romaji}</div>
                                <div className="text-xs text-indigo-300">{item.devanagari}</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800">
                            <HighlightedMnemonic word={item.mnemonicWord} />
                            <p className="text-xs text-slate-400 mt-1">{item.mnemonicTip}</p>
                        </div>
                        <div className="mt-3">
                            <AudioPlayer />
                        </div>
                    </div>
                ))}
            </div>

            {/* Rapid Reflex Mini-Drill */}
            {activeTarget && (
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 text-center">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                        Rapid Reflex Test • Accuracy: {score.hits}/{score.total}
                    </div>
                    <div className="my-4 text-7xl font-black text-white">{activeTarget.symbol}</div>
                    <div className="flex justify-center gap-3">
                        {clusterItems.map((choice) => (
                            <button
                                key={choice.id}
                                onClick={() => handlePick(choice.romaji)}
                                className="rounded-xl border border-slate-700 bg-slate-950 px-6 py-3 text-base font-bold text-white hover:border-teal-400"
                            >
                                {choice.romaji} ({choice.devanagari.split(" ")[0]})
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}