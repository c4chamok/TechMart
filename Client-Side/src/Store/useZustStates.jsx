import React from 'react';
import { useCartStore } from './useCartStore';
import { useUserStore } from './useUserStore';

const useZustStates = () => {
    const { cart, addToCart, emptyCart, removeItems } = useCartStore();
    const { user, setUser, isUserLoading, getUser, logOutUser } = useUserStore();
    return { cart, addToCart, emptyCart, removeItems, user, setUser, isUserLoading, getUser, logOutUser };
};

export default useZustStates;