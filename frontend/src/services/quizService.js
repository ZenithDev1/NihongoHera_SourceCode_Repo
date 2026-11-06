import api from "./api";

export const quizService = {
    async fetchSrsDeck(size = 15) {
        const { data } = await api.get(`/quiz/srs-deck?size=${size}`);
        return data;
    },
    async submitQuiz(mode, attempts) {
        const { data } = await api.post("/quiz/submit", { mode, attempts });
        return data;
    },
    async fetchDashboard() {
        const { data } = await api.get("/progress/dashboard");
        return data;
    }
};