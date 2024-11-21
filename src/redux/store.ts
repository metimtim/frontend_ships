import { configureStore } from '@reduxjs/toolkit';
import shipsReducer from './shipsSlice';

const store = configureStore({
    reducer: {
        ships: shipsReducer,
    },
});

export default store;