// src/redux/threatsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputValue: '',
    ships: [],
    currentParkingId: null,
    currentCount: 0,
};

const shipsSlice = createSlice({
    name: 'ships',
    initialState,
    reducers: {
        setShips: (state, action) => {
            state.ships = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setCurrentParkingId: (state, action) => {
            state.currentParkingId = action.payload;
        },
        setCurrentCount: (state, action) => {
            state.currentCount = action.payload;
        },
    },
});

export const {
    setShips,
    setInputValue,
    setCurrentParkingId,
    setCurrentCount,
} = shipsSlice.actions;

export default shipsSlice.reducer;