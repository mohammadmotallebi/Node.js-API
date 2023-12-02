import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {useRouter} from 'next/navigation';
import type {RootState} from "@redux/store";
import {setToken, setUser, setIsLoggedIn, setIsLoading, setError} from "@redux/slices/authSlice";



export const logout = () => {
    const router = useRouter()
    router.push('/auth/login')
}

export const redirect = (path: string) => {
    const router = useRouter()
    router.push(path)
}

const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

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
            headers.set('X-API-KEY', 'x4CsiyWKKNSl1P3FS2vWPwiGhwTLdqUCVynogB3rEvFtRJLTs8aEBZywfAAL')
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
                    dispatch(setUser(data.user))
                    dispatch(setIsLoggedIn(true))
                })

            },

        }),
    })
});

export const {
    useLazyLoginQuery,
    useLazyRegisterQuery,
    useLazyAuthQuery,
    useLazyLogoutQuery
} = api;
export const {reducer, middleware} = api;
