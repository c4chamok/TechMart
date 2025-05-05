import { create } from "zustand";

const userStore  = create((set)=>({
    user: null,
    setUser: (data) =>set({ user: data })
}))