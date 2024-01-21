import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData;
        },
        signup: (state) => {
            state.userData = null;
        }
     }
})

export const {login, signup} = authSlice.actions;

export default authSlice.reducer;