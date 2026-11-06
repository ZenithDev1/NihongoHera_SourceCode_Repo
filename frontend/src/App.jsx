import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import QuizPage from "./pages/QuizPage";
import DashboardPage from "./pages/DashboardPage";
import LookAlikeDrillPage from "./pages/LookAlikeDrillPage";
import KatakanaPage from "./pages/KatakanaPage";
import ToolsPage from "./pages/ToolsPage";
import ProgrammaticSeoPage from "./pages/ProgrammaticSeoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            {/* Zero-Signup Rule: Root route drops straight into the active practice session */}
                            <Route path="/" element={<QuizPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/look-alikes" element={<LookAlikeDrillPage />} />
                            <Route path="/katakana" element={<KatakanaPage />} />
                            <Route path="/tools" element={<ToolsPage />} />
                            <Route path="/learn/:script/:romaji" element={<ProgrammaticSeoPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}