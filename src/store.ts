import { configureStore } from "@reduxjs/toolkit";
import setUserInfoReducer from "./Features/Auth/UserInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemReducer from "./Features/Dashboard/ItemsSlice";

export const store = configureStore({
    reducer: {
        userInfo: setUserInfoReducer,
        items: ItemReducer
    }
});

type AppStore = typeof store;

type AppDispatch = AppStore['dispatch'];
type AppState = ReturnType<AppStore['getState']>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();