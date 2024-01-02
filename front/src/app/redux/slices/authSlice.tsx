import {createSlice} from '@reduxjs/toolkit';
import {api} from '@services/api';
import {cookies} from "next/headers";

/*
{
    "status": "success",
    "user": {
        "id": 10,
        "name": "mohammad",
        "email": "mohamad.motalebi@gmail.com",
        "email_verified_at": null,
        "role_id": 1,
        "created_at": "2023-10-15T18:02:26.000000Z",
        "updated_at": "2023-10-15T18:02:26.000000Z"
    },
    "token": "Bearer 21|MQZDC52LoBkRoYLSDlkS9tmYRse0IypjfQBeyp5Ufc11d727"
}
*/

const initialState = {
    user: {},
    token: '',
    isLoggedIn: false,
    isLoading: false,
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.login.matchPending, (state, action) => {
            state.isLoading = true
        })
        builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            // @ts-ignore
            state.user = action.payload.user
            // @ts-ignore
            state.token = action.payload.token
        })
        builder.addMatcher(api.endpoints.login.matchRejected, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.error = action.payload
        })
        builder.addMatcher(api.endpoints.register.matchPending, (state, action) => {
            state.isLoading = true

        })
        builder.addMatcher(api.endpoints.register.matchFulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            // @ts-ignore
            state.user = action.payload.user
        })
        builder.addMatcher(api.endpoints.register.matchRejected, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.error = action.payload
        })
        builder.addMatcher(api.endpoints.logout.matchPending, (state, action) => {
            state.isLoading = true
        })
        builder.addMatcher(api.endpoints.logout.matchFulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = false
            state.user = {}

        })
        builder.addMatcher(api.endpoints.logout.matchRejected, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.error = action.payload
        })
        builder.addMatcher(api.endpoints.auth.matchPending, (state, action) => {
            state.isLoading = true
        })
        builder.addMatcher(api.endpoints.auth.matchFulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            // @ts-ignore
            state.user = action.payload?.user
        })
        builder.addMatcher(api.endpoints.auth.matchRejected, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.error = action.payload
        })
    }
})

export const {setToken, setUser, setIsLoggedIn, setIsLoading, setError} = authSlice.actions

export default authSlice.reducer