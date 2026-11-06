import React, { createContext, useContext, useState, useEffect } from "react";
import { quizService } from "../services/quizService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("hera_user");
        return saved ? JSON.parse(saved) : null;
    });
    const [showDevanagari, setShowDevanagari] = useState(() => {
        const saved = localStorage.getItem("hera_devanagari");
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [guestAttempts, setGuestAttempts] = useState(() => {
        const saved = localStorage.getItem("hera_guest_attempts");
        return saved ? JSON.parse(saved) : [];
    });
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        localStorage.setItem("hera_devanagari", JSON.stringify(showDevanagari));
    }, [showDevanagari]);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3200);
    };

    const recordLocalAttempt = (characterSymbol, correct, responseTimeMs) => {
        const updated = [...guestAttempts, { characterSymbol, correct, responseTimeMs }];
        setGuestAttempts(updated);
        localStorage.setItem("hera_guest_attempts", JSON.stringify(updated));
    };

    const authenticateUser = async (authResponse) => {
        localStorage.setItem("hera_jwt", authResponse.token);
        localStorage.setItem("hera_user", JSON.stringify(authResponse));
        setUser(authResponse);

        // Sync guest onboarding attempts immediately upon login/signup
        if (guestAttempts.length > 0) {
            try {
                await quizService.submitQuiz("GUEST_ONBOARDING_SYNC", guestAttempts);
                localStorage.removeItem("hera_guest_attempts");
                setGuestAttempts([]);
                triggerToast("Guest practice stats synced to your Diamond profile!");
            } catch {
                // Keep local backup if offline
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("hera_jwt");
        localStorage.removeItem("hera_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                showDevanagari,
                setShowDevanagari,
                guestAttempts,
                recordLocalAttempt,
                authenticateUser,
                logout,
                toastMessage,
                triggerToast
            }}
        >
            {children}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl border border-teal-500/40 animate-bounce">
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-400"></span>
                    {toastMessage}
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);