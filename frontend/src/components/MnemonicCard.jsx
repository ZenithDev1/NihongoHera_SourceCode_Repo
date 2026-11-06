import React from "react";
import AudioPlayer from "./AudioPlayer";
import { useAuth } from "../context/AuthContext";

export function HighlightedMnemonic({ word }) {
    // Matches [PHONETIC]restOfWord e.g. "[COA]t" -> <strong class="text-amber-400">COA</strong>t
    const match = word.match(/^(.*)\[(.+?)\](.*)$/);
    if (!match) return <span className="font-bold text-amber-400">{word}</span>;
    const [, prefix, highlighted, suffix] = match;

    return (
        <span className="text-lg font-medium text-slate-200 tracking-wide">
      {prefix}
            <strong className="rounded bg-amber-400/20 px-1.5 py-0.5 font-extrabold text-amber-300 underline decoration-amber-400 decoration-2 underline-offset-4">
        {highlighted}
      </strong>
            {suffix}
    </span>
    );
}

export default function MnemonicCard({ kana }) {
    const { showDevanagari } = useAuth();
    if (!kana) return null;

    return (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div className="flex items-start justify-between">
                <div>
          <span className="inline-block rounded-md bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal-400">
            {kana.script} • {kana.row}-Row ({kana.variation})
          </span>
                    <div className="mt-2 flex items-baseline gap-4">
                        <span className="text-5xl font-black text-white">{kana.symbol}</span>
                        <span className="text-2xl font-bold text-teal-400">{kana.romaji}</span>
                        {showDevanagari && (
                            <span className="rounded-lg bg-indigo-500/15 border border-indigo-400/30 px-2.5 py-1 text-sm font-semibold text-indigo-300">
                🇮🇳 {kana.devanagari}
              </span>
                        )}
                    </div>
                </div>
                <AudioPlayer />
            </div>

            <div className="mt-4 rounded-xl bg-slate-950/70 p-3.5 border border-slate-800/80">
                <div className="text-xs uppercase tracking-wider text-slate-400">
                    Phonetic Memory Keyword
                </div>
                <div className="mt-1">
                    <HighlightedMnemonic word={kana.mnemonicWord} />
                </div>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    {kana.mnemonicTip}
                </p>
            </div>
        </div>
    );
}