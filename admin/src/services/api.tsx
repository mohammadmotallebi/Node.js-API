import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setUser, setIsLoggedIn} from "../redux/slices/authSlice";
import config from "../config.json";

// @ts-ignore
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8050/api/',
        credentials: 'include',
        prepareHeaders: (headers, {}) => {
            // const token = getCookieValue('token')
            // console.log('token', token)
            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`)
            // }
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
        createPost: build.query({
            query: (body) => ({
                url: 'post/create',
                method: 'POST',
                body
            }),
        }),
        postById: build.query({
            query: (id) => ({
                url: `post/${id}`,
                method: 'GET',
            }),
        }),
        updatePost: build.query({
            query: (body) => ({
                url: `post/update`,
                method: 'PUT',
                body
            }),
        }),
        deletePost: build.query({
            query: (id) => ({
                url: `post/${id}/delete`,
                method: 'DELETE',
            }),
        }),
        users: build.query({
            query: () => ({
                url: 'users',
                method: 'POST',
            }),
        }),
        createUser: build.query({
            query: (body) => ({
                url: 'user/create',
                method: 'POST',
                body
            }),
        }),
        userById: build.query({
            query: (id) => ({
                url: `user/${id}`,
                method: 'GET',
            }),
        }),
        updateUser: build.query({
            query: (body) => ({
                url: `user/update`,
                method: 'PUT',
                body
            }),
        }),
        deleteUser: build.query({
            query: (id) => ({
                url: `user/${id}/delete`,
                method: 'DELETE',
            }),
        }),
        roles: build.query({
            query: () => ({
                url: `roles`,
                method: 'POST',
            }),
        }),
        updatePassword: build.query({
            query: (body) => ({
                url: `user/update-password`,
                method: 'PUT',
                body
            }),
        }),
        listMdx: build.query({
            query: () => ({
                url: `list-mdx`,
                method: 'GET',
            }),
        }),
        saveMdx: build.query({
            query: (body) => ({
                url: `save-mdx`,
                method: 'POST',
                body
            }),
        }),
        readMdx: build.query({
            query: (path) => ({
                url: `read-mdx`,
                method: 'POST',
                body: {path: path}
            }),
        }),
        // Job endpoints
        jobs: build.query({
            query: () => ({
                url: `jobs`,
                method: 'POST',
            }),
        }),
        createJob: build.query({
            query: (body) => ({
                url: `job/create`,
                method: 'POST',
                body
            }),
        }),
        updateJob: build.query({
            query: (body) => ({
                url: `job/update`,
                method: 'PUT',
                body
            }),
        }),
        deleteJob: build.query({
            query: (id) => ({
                url: `job/${id}/delete`,
                method: 'DELETE',
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
    useLazyCreatePostQuery,
    useLazyPostByIdQuery,
    useLazyUpdatePostQuery,
    useLazyDeletePostQuery,
    useLazyUsersQuery,
    useLazyCreateUserQuery,
    useLazyUserByIdQuery,
    useLazyUpdateUserQuery,
    useLazyDeleteUserQuery,
    useLazyRolesQuery,
    useLazyUpdatePasswordQuery,
    useLazyListMdxQuery,
    useLazySaveMdxQuery,
    useLazyReadMdxQuery,
    useLazyJobsQuery,
    useLazyCreateJobQuery,
    useLazyUpdateJobQuery,
    useLazyDeleteJobQuery,
} = api;
export const {reducer, middleware} = api;
