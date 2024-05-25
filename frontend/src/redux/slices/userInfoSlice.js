import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "../actions/userActions";

const initialState = {
    status: '',
    error: '',
    user:{
        id: '',
        name: '',
        email: '',
        avatar: '',
        token: '',
    },
};

export const userInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: (state) => {
            state.status = '';
            state.error = '';
            state.user = {
                id: '',
                name: '',
                email: '',
                avatar: '',
                token: '',
            };
        },
    },

    extraReducers(builder) {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.error = "";
                state.user = action.payload.user;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export const { signOut } = userInfoSlice.actions;
export default userInfoSlice.reducer;