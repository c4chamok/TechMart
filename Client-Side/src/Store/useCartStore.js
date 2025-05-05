import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (payload) => set((state) => {
        const existingIndex = state.cart.findIndex(item => item.prodId === payload.prodId)

        // If product already in cart, update its qty
        if (existingIndex !== -1) {
            const updatedCart = [...state.cart]
            updatedCart[existingIndex].qty = payload.qty;
            return { cart: updatedCart.filter((item)=>item.qty>0) }
        }

        // If not in cart, add new item
        return { cart: [...state.cart, payload] }
    })
}))