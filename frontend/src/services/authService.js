import api from "./api";

export const authService = {
    async signup(payload) {
        const { data } = await api.post("/auth/signup", payload);
        return data;
    },
    async login(payload) {
        const { data } = await api.post("/auth/login", payload);
        return data;
    },
    async forgotPassword(payload) {
        const { data } = await api.post("/auth/forgot-password", payload);
        return data;
    }
};