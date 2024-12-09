import { configureStore } from '@reduxjs/toolkit';
import shipsReducer from './shipsSlice.ts';
import authReducer from './authSlice.ts';

const store = configureStore({
    reducer: {
        ships: shipsReducer,
        auth: authReducer,
    },
});

export default store;