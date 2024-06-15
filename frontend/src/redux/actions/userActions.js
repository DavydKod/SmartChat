import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const signIn = createAsyncThunk(
    "auth/signIn",
    async (userCredentials, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/auth/login`, {
                ...userCredentials,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const SignUp = createAsyncThunk(
    "auth/signUp",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/auth/register`, {
                ...values,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);