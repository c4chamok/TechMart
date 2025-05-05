import React from 'react';
import { useCartStore } from './useCartStore';

const States = () => {
    const { cart, addToCart } = useCartStore();
    return { cart, addToCart };
};

export default States;