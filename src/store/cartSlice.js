import { createSlice } from '@reduxjs/toolkit';

// Helper function to load state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        return serializedState ? JSON.parse(serializedState) : { cartList: [], total: 0 };
    } catch (e) {
        console.error("Could not load cart state", e);
        return { cartList: [], total: 0 };
    }
};

// Helper function to save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.error("Could not save cart state", e);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadState(),
    reducers: {
        add(state, action) {
            const updatedCartList = state.cartList.concat(action.payload);
            const total = state.total + action.payload.price;
            const newState = { ...state, total: total, cartList: updatedCartList };
            saveState(newState);  // Save state to localStorage
            return newState;
        },
        remove(state, action) {
            const updatedCartList = state.cartList.filter(product => product.id !== action.payload.id);
            const total = state.total - action.payload.price;
            const newState = { ...state, total: total, cartList: updatedCartList };
            saveState(newState);  // Save state to localStorage
            return newState;
        },
    }
});

export const { add, remove } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
