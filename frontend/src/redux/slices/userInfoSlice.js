import { createSlice } from "@reduxjs/toolkit";
import {signIn, SignUp, UpdateUser} from "../actions/userActions";

const initialState = {
    status: 'idle',
    error: null,
    user:{
        id: '',
        name: '',
        tag: '',
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
                tag: '',
                email: '',
                avatar: '',
                token: '',
            };
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
    },

    extraReducers(builder) {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.user = action.payload.user;
                console.log("sign in payload", action.payload);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(SignUp.pending, (state) => {
                state.status = "loading";
            })
            .addCase(SignUp.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(SignUp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(UpdateUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.user = action.payload.user;
                console.log("payload", action.payload);
            })
            .addCase(UpdateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export const { signOut, changeStatus } = userInfoSlice.actions;
export default userInfoSlice.reducer;