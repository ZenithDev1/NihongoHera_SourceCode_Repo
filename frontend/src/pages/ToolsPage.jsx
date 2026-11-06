import React, { useState } from "react";
import { Download, Wand2, BookOpen, Languages } from "lucide-react";
import { KANA_CATALOG } from "../data/kanaCatalog";

const SYLLABARY_MAP = {
    ka: { h: "か", k: "カ" }, ki: { h: "き", k: "キ" }, ku: { h: "く", k: "ク" }, ke: { h: "け", k: "ケ" }, ko: { h: "こ", k: "コ" },
    sa: { h: "さ", k: "サ" }, shi: { h: "し", k: "シ" }, su: { h: "す", k: "ス" }, se: { h: "せ", k: "セ" }, so: { h: "そ", k: "ソ" },
    ta: { h: "た", k: "タ" }, chi: { h: "ち", k: "チ" }, tsu: { h: "つ", k: "ツ" }, te: { h: "て", k: "テ" }, to: { h: "と", k: "ト" },
    na: { h: "な", k: "ナ" }, ni: { h: "に", k: "ニ" }, nu: { h: "ぬ", k: "ヌ" }, ne: { h: "ね", k: "ネ" }, no: { h: "の", k: "ノ" },
    ha: { h: "は", k: "ハ" }, hi: { h: "ひ", k: "ヒ" }, fu: { h: "ふ", k: "フ" }, he: { h: "へ", k: "ヘ" }, ho: { h: "ほ", k: "ホ" },
    ma: { h: "ま", k: "マ" }, mi: { h: "み", k: "ミ" }, mu: { h: "む", k: "ム" }, me: { h: "め", k: "メ" }, mo: { h: "も", k: "モ" },
    ya: { h: "や", k: "ヤ" }, yu: { h: "ゆ", k: "ユ" }, yo: { h: "よ", k: "ヨ" },
    ra: { h: "ら", k: "ラ" }, ri: { h: "り", k: "リ" }, ru: { h: "る", k: "ル" }, re: { h: "れ", k: "レ" }, ro: { h: "ろ", k: "ロ" },
    wa: { h: "わ", k: "ワ" }, wo: { h: "を", k: "ヲ" }, n: { h: "ん", k: "ン" },
    a: { h: "あ", k: "ア" }, i: { h: "い", k: "イ" }, u: { h: "う", k: "ウ" }, e: { h: "え", k: "エ" }, o: { h: "お", k: "オ" }
};

function convertRomaji(input, target = "h") {
    let text = input.toLowerCase().trim();
    // Replace 3-letter syllables first (tsu, shi, chi), then 2-letter, then 1-letter
    const keys = Object.keys(SYLLABARY_MAP).sort((a, b) => b.length - a.length);
    for (const key of keys) {
        text = text.replaceAll(key, SYLLABARY_MAP[key][target]);
    }
    return text;
}

export default function ToolsPage() {
    const [romajiInput, setRomajiInput] = useState("watashi wa nihongo");
    const [nameInput, setNameInput] = useState("Aarav");

    const convertNameToKatakana = (rawName) => {
        const clean = rawName.toLowerCase().trim();
        if (!clean) return "";
        // Pad trailing consonants (except 'n') with 'u' for authentic Japanese loanword phonetics
        const normalized = clean
            .replace(/l/g, "r")
            .replace(/v/g, "b")
            .replace(/([kgstnhmyrwbdp])(?![aeiouy])/g, "$1u");
        return convertRomaji(normalized, "k");
    };

    const downloadPracticeSheet = (title, filterFn) => {
        const list = KANA_CATALOG.filter(filterFn);
        const lines = [
            `====================================================`,
            ` NIHONGO HERA - ${title.toUpperCase()}`,
            ` Free Printable Stroke & Devanagari Sheet (No Email Wall)`,
            `====================================================\n`,
            ...list.map(
                (c) =>
                    `${c.symbol}  (${c.romaji.padEnd(4)}) | Hindi: ${c.devanagari.padEnd(18)} | Mnemonic: ${c.mnemonicWord.padEnd(16)} | Practice: [ ${c.symbol} ] [   ] [   ] [   ]`
            )
        ];
        const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
            {/* Interactive Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tool 1: Romaji to Kana Converter */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                        <Languages className="h-4 w-4" /> Free Utility #1
                    </div>
                    <h2 className="text-xl font-black text-white mt-1">
                        Instant Romaji to Hiragana & Katakana Converter
                    </h2>
                    <input
                        type="text"
                        value={romajiInput}
                        onChange={(e) => setRomajiInput(e.target.value)}
                        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        placeholder="Type romaji e.g. sushi, sakura, tsuki..."
                    />
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                            <div className="text-[10px] uppercase text-slate-400">Hiragana Output</div>
                            <div className="mt-1 text-2xl font-bold text-teal-300">
                                {convertRomaji(romajiInput, "h")}
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                            <div className="text-[10px] uppercase text-slate-400">Katakana Output</div>
                            <div className="mt-1 text-2xl font-bold text-indigo-300">
                                {convertRomaji(romajiInput, "k")}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tool 2: My Name in Katakana Generator */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <Wand2 className="h-4 w-4" /> Free Utility #2
                    </div>
                    <h2 className="text-xl font-black text-white mt-1">
                        "My Name in Katakana" Generator
                    </h2>
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white"
                        placeholder="Enter your name (e.g. Rohan, Priya, Aarav)..."
                    />
                    <div className="mt-4 rounded-xl bg-slate-950 p-4 border border-slate-800 text-center">
                        <div className="text-[10px] uppercase text-slate-400">Your Japanese Katakana Stamp</div>
                        <div className="mt-1 text-4xl font-black text-amber-300 tracking-widest">
                            {convertNameToKatakana(nameInput)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Zero-Email-Wall Downloadable Assets */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <h2 className="text-xl font-black text-white">
                    Free Downloadable Practice Sheets & Wallpapers (No Email Wall)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                    Instant one-click downloads with Devanagari phonetic guides and stroke boxes.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                        onClick={() =>
                            downloadPracticeSheet("Hiragana 46 Master Sheet", (k) => k.script === "HIRAGANA")
                        }
                        className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-teal-400 transition"
                    >
                        <div>
                            <div className="text-sm font-bold text-white">Hiragana + Hindi Grid</div>
                            <div className="text-[11px] text-slate-400">Printable 46 Kana Worksheet</div>
                        </div>
                        <Download className="h-5 w-5 text-teal-400" />
                    </button>

                    <button
                        onClick={() =>
                            downloadPracticeSheet("Katakana 46 Master Sheet", (k) => k.script === "KATAKANA")
                        }
                        className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-teal-400 transition"
                    >
                        <div>
                            <div className="text-sm font-bold text-white">Katakana Loanword Sheet</div>
                            <div className="text-[11px] text-slate-400">Printable 46 Katakana Grid</div>
                        </div>
                        <Download className="h-5 w-5 text-teal-400" />
                    </button>

                    <button
                        onClick={() =>
                            downloadPracticeSheet("Confusing Kana Cheat Wallpaper", (k) => k.lookAlike !== null)
                        }
                        className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-teal-400 transition"
                    >
                        <div>
                            <div className="text-sm font-bold text-white">Look-Alike Cheat Sheet</div>
                            <div className="text-[11px] text-slate-400">シ/ツ, ソ/ン, さ/き Reference</div>
                        </div>
                        <Download className="h-5 w-5 text-teal-400" />
                    </button>
                </div>
            </div>

            {/* Targeted Indian JLPT N5 Guides */}
            <div className="space-y-4">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-400" /> Targeted Guides for Indian JLPT N5 Aspirants
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <span className="rounded bg-indigo-500/20 px-2.5 py-1 text-[10px] font-bold text-indigo-300">
              HINDI TO JAPANESE PHONETICS
            </span>
                        <h3 className="mt-3 text-lg font-bold text-white">
                            Learn Hiragana Through Hindi (Why Varnamala Gives You an Unfair Advantage)
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                            Both Japanese Gojuon (五十音) and Hindi Devanagari Varnamala are organized scientifically by mouth position: Vowels first (あ इ उ ए ओ = अ इ उ ए ओ), followed by Velar (Ka-row = क-वर्ग), Palatal, Dental (Ta-row = त-वर्ग), and Labial sounds. For <strong>つ (tsu)</strong>, combine half <em>त्</em> + <em>सु</em> = <strong>त्सु</strong>.
                        </p>
                    </article>

                    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <span className="rounded bg-teal-500/20 px-2.5 py-1 text-[10px] font-bold text-teal-300">
              JLPT N5 BLUEPRINT
            </span>
                        <h3 className="mt-3 text-lg font-bold text-white">
                            Best Way to Memorize All 92 Kana in 5 Days Using 70/30 Spaced Repetition
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                            Passive flashcards fail when you hit Katakana look-alikes like <strong>シ (shi)</strong> and <strong>ツ (tsu)</strong>. Combine QWERTY Romaji muscle-memory typing with our 70/30 SRS queue so your weak characters appear 70% of the time until every tile on your heatmap turns Dark Green.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}