import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:6060/auth/api";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error Signing In!", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.data, isAuthenticated: true, isLoading: false, error: null });
            console.log(response.data);
        }
        catch (error) {
            set({ error: error.response.data.message || "Error Logging In!", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error logging Out!", isLoading: false });
            throw error;
        }
    },
    verifyemail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/verifyemail`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error Verifying Email", isLoading: false });
            throw error;

        }
    },
    checkauth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
    forgotpassword: async (email) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "There was an Error Visiting Forgot-Password!", isLoading: false });
            throw error;
        }
    },
    resetpassword: async (token, password) => {
        set({ isLoading: true, error: null, message: null })
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error Resetting Pasword", isLoading: false });
            throw error;
        }

    },

}));

