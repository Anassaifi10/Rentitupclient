import { createSlice } from '@reduxjs/toolkit';
import type { UserInfo } from '../../Models/UserModels';


const initialState: Partial<UserInfo> = {};
const userInfoslice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state = action.payload;
            return state;
        },
        clearUserInfo: () => {
            return {};
        }
    }
})

export const { setUserInfo, clearUserInfo } = userInfoslice.actions;
export default userInfoslice.reducer;