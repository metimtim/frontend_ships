// src/redux/threatsSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {api} from "../api";
import Cookies from "js-cookie";

export const fetchShips = createAsyncThunk(
    'ships/fetchShips',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.ships.shipsList();

            const ships = response.data.filter((item) => item.id_ship !== undefined);

            // Извлекаем draft_request_id и count из данных
            const parkingIdData = response.data.find((item) => item.draft_request_id);
            const parkingCountData = response.data.find((item) => item.count);

            return {
                ships,
                draftRequestId: parkingIdData?.draft_request_id || null,
                count: parkingCountData?.count || 0,
            };
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

// Асинхронный экшен для поиска мест обитания
export const searchShips = createAsyncThunk(
    'ships/searchShips',
    async (inputValue, { rejectWithValue }) => {
        try {
            const response = await api.ships.shipsList({ class_name: inputValue });
            return response.data.filter(item => item.id_ship !== undefined);
        } catch (error) {
            return rejectWithValue('Ошибка при выполнении поиска');
        }
    }
);

// Асинхронный экшен для добавления места обитания в заявку
export const addShipToDraft = createAsyncThunk(
    'ships/addShipToDraft',
    async (shipId, { getState, rejectWithValue }) => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await api.ships.shipsAddCreate(shipId, {}, {
                headers: { 'X-CSRFToken': csrfToken }
            });

            // const updatedParkingId = response.data.draft_request_id;
            return { updatedShips: response.data };
        } catch (error) {
            return rejectWithValue('Ошибка при добавлении корабля');
        }
    }
);

const shipsSlice = createSlice({
    name: 'ships',
    initialState: {
        inputValue: '',
        ships: [],
        currentParkingId: null,
        currentCount: 0,
        loading: false,
        error: null,
    },
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
    extraReducers: (builder) => {
        builder
            // Обработка загрузки мест обитания
            .addCase(fetchShips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShips.fulfilled, (state, action) => {
                state.loading = false;
                state.ships = action.payload.ships;
                state.currentParkingId = action.payload.draftRequestId;
                state.currentCount = action.payload.count;
            })
            .addCase(fetchShips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Обработка поиска мест обитания
            .addCase(searchShips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchShips.fulfilled, (state, action) => {
                state.loading = false;
                state.ships = action.payload;
            })
            .addCase(searchShips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Обработка добавления места обитания в заявку
            .addCase(addShipToDraft.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addShipToDraft.fulfilled, (state, action) => {
                state.loading = false;
                state.ships = state.ships.filter(ship => ship.id_ship !== action.payload.updatedShips.id_ship);
                state.currentParkingId = action.payload.updatedParkingId;
                state.currentCount += 1;
            })
            .addCase(addShipToDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setShips,
    setInputValue,
    setCurrentParkingId,
    setCurrentCount,
} = shipsSlice.actions;

export default shipsSlice.reducer;