import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getChats = createAsyncThunk(
    'chats/getChats',
    async ({ token, userId }, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/chat//userChats/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);