import React from 'react';
import { useCartStore } from './useCartStore';

const useZustStates = () => {
    const { cart, addToCart, emptyCart, removeItems } = useCartStore();
    return { cart, addToCart, emptyCart, removeItems };
};

export default useZustStates;