import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    isUserLoading: true,
    setUser: (data) => set({ user: data }),
    getUser: async () => {
        set({ isUserLoading: true });
        const isLogged = localStorage.getItem("isLoggedIn");
        try {
            if(isLogged !== "true") return;
            const token = localStorage.getItem("access-token");
            const { data } = await axios("http://localhost:5000/api/profile", {
                headers: { authorization: `bearer ${token}` },
            });
            set({ user: data?.profile, isUserLoading: false });
        } catch (error) {
            console.error("Error fetching user:", error);
            set({ isUserLoading: false, user: null });
        }
    },
    logOutUser: () => {
        localStorage.removeItem("access-token")
        localStorage.setItem("isLoggedIn", false);
        set({ isUserLoading: false, user: null })

    }
}))