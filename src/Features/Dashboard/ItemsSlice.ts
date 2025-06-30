import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "../../Models/ItemsModels";


interface ItemState {
    items: Item[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
}

const itemSlice=createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        fetchItemsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchItemsSuccess(state, action) {
            state.loading = false;
            state.items = action.payload.items;
        },
        fetchItemsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure } = itemSlice.actions;

export default itemSlice.reducer;