import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from "./reducers/rootReducer";

const saveUserFilter = createFilter('user', ["user"]);

const persistConfig = {
    key: 'user',
    storage: storageSession,
    whitelist: ['user'],
    transforms: [saveUserFilter]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export const persistor = persistStore(store);
