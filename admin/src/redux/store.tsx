// configures the redux-toolkit store and use PersistGate to persist the store in local storage
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {api} from '../services/api';
import authReducer from '../redux/slices/authSlice';

// This middleware will check authentication for every request if user is not authenticated it will redirect to login page

const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;