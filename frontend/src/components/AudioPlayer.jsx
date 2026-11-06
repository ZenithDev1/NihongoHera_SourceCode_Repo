import React from "react";
import { Volume2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AudioPlayer({ label = "Listen" }) {
    const { triggerToast } = useAuth();

    const handlePlayClick = (e) => {
        e.stopPropagation();
        triggerToast("Audio feature will be available very soon!");
    };

    return (
        <button
            type="button"
            onClick={handlePlayClick}
            title="Play native pronunciation"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-300 border border-teal-500/30 hover:bg-teal-500/20 transition"
        >
            <Volume2 className="h-4 w-4 text-teal-400" />
            <span>{label}</span>
        </button>
    );
}