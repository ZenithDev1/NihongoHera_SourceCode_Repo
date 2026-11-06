import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}