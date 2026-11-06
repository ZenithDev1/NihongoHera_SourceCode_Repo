import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Keyboard, CheckCircle2, Sparkles, ShieldAlert } from "lucide-react";
import { KANA_CATALOG, ROW_MICRO_WORDS } from "../data/kanaCatalog";
import { useAuth } from "../context/AuthContext";
import { quizService } from "../services/quizService";
import MnemonicCard, { HighlightedMnemonic } from "../components/MnemonicCard";
import AudioPlayer from "../components/AudioPlayer";
import Modal from "../components/Modal";

export default function QuizPage() {
    const { user, showDevanagari, recordLocalAttempt, guestAttempts, triggerToast } = useAuth();

    const [drillMode, setDrillMode] = useState("TYPING"); // TYPING | MCQ
    const [filterMode, setFilterMode] = useState("ALL_GOJUON"); // ALL_GOJUON | DAKUTEN_ONLY | KA_ROW | SA_ROW
    const [deck, setDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedInput, setTypedInput] = useState("");
    const [sessionAttempts, setSessionAttempts] = useState([]);
    const [feedback, setFeedback] = useState(null); // { correct, expected }
    const [showMicroReadingModal, setShowMicroReadingModal] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());

    const inputRef = useRef(null);

    useEffect(() => {
        buildDeck(filterMode);
    }, [filterMode]);

    const buildDeck = (selectedFilter) => {
        let pool = [...KANA_CATALOG];
        if (selectedFilter === "DAKUTEN_ONLY") {
            pool = pool.filter((k) => k.variation === "DAKUTEN" || k.variation === "HANDAKUTEN");
        } else if (selectedFilter === "KA_ROW") {
            pool = pool.filter((k) => k.row === "KA" && k.script === "HIRAGANA");
        } else if (selectedFilter === "SA_ROW") {
            pool = pool.filter((k) => k.row === "SA" && k.script === "HIRAGANA");
        } else {
            pool = pool.filter((k) => k.script === "HIRAGANA" && k.variation === "GOJUON");
        }
        const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 10);
        setDeck(shuffled);
        setCurrentIndex(0);
        setSessionAttempts([]);
        setFeedback(null);
        setTypedInput("");
        setQuestionStartTime(Date.now());
    };

    const currentKana = deck[currentIndex];

    const handleAnswer = async (userRomaji) => {
        if (!currentKana || feedback) return;
        const isCorrect = userRomaji.trim().toLowerCase() === currentKana.romaji.toLowerCase();
        const elapsed = Date.now() - questionStartTime;

        const attempt = {
            characterSymbol: currentKana.symbol,
            correct: isCorrect,
            responseTimeMs: elapsed
        };

        const nextAttempts = [...sessionAttempts, attempt];
        setSessionAttempts(nextAttempts);
        recordLocalAttempt(currentKana.symbol, isCorrect, elapsed);
        setFeedback({ correct: isCorrect, expected: currentKana.romaji });

        setTimeout(async () => {
            setFeedback(null);
            setTypedInput("");
            if (currentIndex + 1 < deck.length) {
                setCurrentIndex((i) => i + 1);
                setQuestionStartTime(Date.now());
                inputRef.current?.focus();
            } else {
                // Completed 10-card micro-session -> trigger Micro-Reading dopamine reward
                setShowMicroReadingModal(true);
                if (user) {
                    try {
                        await quizService.submitQuiz(
                            filterMode === "DAKUTEN_ONLY" ? "DAKUTEN" : "TYPING_SPEED",
                            nextAttempts
                        );
                        triggerToast("Session saved to your 70/30 SRS profile!");
                    } catch {
                        // Handled gracefully
                    }
                }
            }
        }, isCorrect ? 420 : 1400);
    };

    const handleTypingChange = (e) => {
        const val = e.target.value.toLowerCase();
        setTypedInput(val);
        if (currentKana && val === currentKana.romaji) {
            handleAnswer(val);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && typedInput.trim().length > 0) {
            handleAnswer(typedInput);
        }
    };

    const getMcqOptions = () => {
        if (!currentKana) return [];
        const distractors = KANA_CATALOG.filter((k) => k.romaji !== currentKana.romaji)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((k) => k.romaji);
        return [...distractors, currentKana.romaji].sort();
    };

    const microReadingRowKey =
        filterMode === "KA_ROW" ? "KA" : filterMode === "SA_ROW" ? "SA" : "KA";

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            {/* Zero-Signup Instant Banner */}
            {!user && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 px-5 py-3.5">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-teal-400 shrink-0" />
                        <p className="text-xs sm:text-sm text-slate-200">
                            <strong>Zero-Signup Instant Practice:</strong> Start typing Romaji right now! You have drilled{" "}
                            <strong className="text-teal-300">{guestAttempts.length} characters</strong> in this session.
                        </p>
                    </div>
                    <Link
                        to="/signup"
                        className="rounded-lg bg-teal-500/20 border border-teal-400/40 px-3.5 py-1.5 text-xs font-bold text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition"
                    >
                        Save Streak & Heatmap →
                    </Link>
                </div>
            )}

            {/* Mode & Variation Filter Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    {[
                        { id: "ALL_GOJUON", label: "Core Hiragana" },
                        { id: "DAKUTEN_ONLY", label: "Dakuten & Maru (ば/ぱ/ご)" },
                        { id: "KA_ROW", label: "Ka-Line (か-こ)" },
                        { id: "SA_ROW", label: "Sa-Line (さ-そ)" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilterMode(tab.id)}
                            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                                filterMode === tab.id
                                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-slate-900 p-1 border border-slate-800">
                    <button
                        onClick={() => setDrillMode("TYPING")}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${
                            drillMode === "TYPING" ? "bg-indigo-500 text-white" : "text-slate-400"
                        }`}
                    >
                        <Keyboard className="h-3.5 w-3.5" /> QWERTY Speed Typing
                    </button>
                    <button
                        onClick={() => setDrillMode("MCQ")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                            drillMode === "MCQ" ? "bg-indigo-500 text-white" : "text-slate-400"
                        }`}
                    >
                        4-Option MCQ
                    </button>
                </div>
            </div>

            {/* Main Arena */}
            {currentKana && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span>
                Card <strong className="text-white">{currentIndex + 1}</strong> of {deck.length}
              </span>
                            <AudioPlayer label="Pronounce" />
                        </div>

                        <div className="my-6 select-none">
                            <div className="text-8xl sm:text-9xl font-black text-white tracking-tight">
                                {currentKana.symbol}
                            </div>

                            {showDevanagari && (
                                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-4 py-1 text-xs font-semibold text-indigo-300">
                                    <span>🇮🇳 Hindi Sound Hint:</span>
                                    <strong className="text-indigo-200">{currentKana.devanagari}</strong>
                                </div>
                            )}
                        </div>

                        {drillMode === "TYPING" ? (
                            <div className="mx-auto max-w-xs">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={typedInput}
                                    onChange={handleTypingChange}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    placeholder="Type Romaji (e.g. ko, tsu)..."
                                    className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-5 py-3.5 text-center text-xl font-bold text-white placeholder-slate-600 focus:border-teal-400 focus:outline-none"
                                />
                                <p className="mt-2 text-[11px] text-slate-400">
                                    Auto-submits on exact match or press <kbd className="rounded bg-slate-800 px-1.5 py-0.5">Enter</kbd>
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                                {getMcqOptions().map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleAnswer(opt)}
                                        className="rounded-2xl border border-slate-700 bg-slate-950 py-3.5 text-lg font-bold text-white hover:border-teal-400 hover:bg-teal-500/10 transition"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {feedback && (
                            <div
                                className={`mt-5 rounded-xl p-3 text-sm font-bold flex items-center justify-center gap-2 ${
                                    feedback.correct
                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                        : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                }`}
                            >
                                {feedback.correct ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" /> Spot on! ({feedback.expected})
                                    </>
                                ) : (
                                    <>
                                        <ShieldAlert className="h-4 w-4" /> Correct Romaji is "{feedback.expected}"
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Live Phonetic Highlighted Mnemonic Helper */}
                    <div className="lg:col-span-5 space-y-4">
                        <MnemonicCard kana={currentKana} />

                        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-300">
                            <div className="font-bold text-white mb-1">
                                💡 Why Highlighted Phonetics?
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                English vowels change sound depending on context. By anchoring{" "}
                                <strong className="text-white">こ (ko)</strong> to{" "}
                                <HighlightedMnemonic word="[COA]t" />, your brain locks onto the pure Japanese{" "}
                                <em>"o"</em> vowel immediately.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Real-Word Micro-Reading Modal (Instant Dopamine Hit after Row Completion) */}
            <Modal
                isOpen={showMicroReadingModal}
                onClose={() => {
                    setShowMicroReadingModal(false);
                    buildDeck(filterMode);
                }}
                title="🎉 Row Complete! Read Real Japanese Words Now"
            >
                <p className="text-xs text-slate-300 mb-4">
                    You just drilled the characters needed to read these authentic Japanese words—no Kanji required!
                </p>
                <div className="space-y-3">
                    {(ROW_MICRO_WORDS[microReadingRowKey] || ROW_MICRO_WORDS.KA).map((w, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5"
                        >
                            <div>
                                <span className="text-2xl font-black text-teal-400 mr-3">{w.kana}</span>
                                <span className="text-sm font-bold text-white">{w.romaji}</span>
                                {showDevanagari && (
                                    <span className="ml-2 text-xs text-indigo-300">({w.hindi})</span>
                                )}
                                <div className="text-xs text-slate-400 mt-0.5">{w.meaning}</div>
                            </div>
                            <AudioPlayer label="Word Audio" />
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                    {!user && (
                        <Link
                            to="/signup"
                            className="flex-1 rounded-xl bg-teal-500 py-2.5 text-center text-xs font-bold text-slate-950 hover:bg-teal-400"
                        >
                            Create Account to Save Streak
                        </Link>
                    )}
                    <button
                        onClick={() => {
                            setShowMicroReadingModal(false);
                            buildDeck(filterMode);
                        }}
                        className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-bold text-white hover:bg-slate-700"
                    >
                        Next 10-Card Drill →
                    </button>
                </div>
            </Modal>
        </div>
    );
}