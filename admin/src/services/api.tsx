import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from "../redux/store";
import {setToken, setUser, setIsLoggedIn, setIsLoading, setError} from "../redux/slices/authSlice";
import config from "../../../config.json";
import {getCookieValue} from "./helpers";

// @ts-ignore
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const token = getCookieValue('token')
            console.log('token', token)
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Accept', 'application/json')
            headers.set('X-API-KEY', config.X_API_KEY)
            return headers
        }
    }),
    endpoints: (build) => ({
        login: build.query({
            query: (body: { email: string, password: string }) => ({
                url: 'login',
                method: 'POST',
                body
            }),
            // @ts-ignore
            onQueryStarted(arg, {queryFulfilled}): Promise<void> | void {
                console.log('onQueryStarted', api)
                queryFulfilled?.then((data: any) => {
                    console.log('onQueryStarted', data)
                    setUser(data.user)
                    setIsLoggedIn(true)


                })
            },
        }),
        register: build.query({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: build.query({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            // logout and redirect to login page
            // @ts-ignore
            onQueryStarted(arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void {
                    api.dispatch(setUser({}))
                    api.dispatch(setIsLoggedIn(false))
            }
        }),
        auth: build.query({
            query: () => ({
                url: 'auth',
                method: 'POST',
            }),
            // @ts-ignore
            onQueryStarted(arg, {queryFulfilled, dispatch}): Promise<void> | void {
                queryFulfilled?.then((data: any) => {
                    console.log('Auth====>onQueryStarted', data)
                    setUser(data.user)
                    setIsLoggedIn(true)
                })

            },

        }),
        posts: build.query({
            query: () => ({
                url: 'posts',
                method: 'POST',
            }),
        }),
        tags: build.query({
            query: () => ({
                url: 'tags',
                method: 'POST',
            }),
        }),
    })
});

export const {
    useLazyLoginQuery,
    useLazyRegisterQuery,
    useLazyAuthQuery,
    useLazyLogoutQuery,
    useLazyPostsQuery,
    useLazyTagsQuery,
} = api;
export const {reducer, middleware} = api;
