import React from "react";
import { KANA_CATALOG } from "../data/kanaCatalog";
import MnemonicCard from "../components/MnemonicCard";

export default function KatakanaPage() {
    const katakanaList = KANA_CATALOG.filter((k) => k.script === "KATAKANA");

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
            <div>
                <h1 className="text-2xl font-black text-white">
                    Katakana Mastery Hub (46 Angular Characters)
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Used for foreign loanwords (コーヒー Coffee, ホテル Hotel, コンピューター Computer) and Indian names in Japan.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {katakanaList.map((kana) => (
                    <MnemonicCard key={kana.id} kana={kana} />
                ))}
            </div>
        </div>
    );
}