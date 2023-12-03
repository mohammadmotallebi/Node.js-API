'use client'
import Dashboard from "@components/Dashboard";
import MyMenu from "@components/Menu";
import Loading from "@components/Loading";
import React from "react";
import store from '@redux/store'
import {useRouter} from "next/navigation";
import {useLazyAuthQuery} from "@services/api";
import {setUser} from "@redux/slices/authSlice";
export default function async () {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [auth, {data, isLoading, isError, isSuccess, status}] = useLazyAuthQuery()
    const checkAuth = async () => {
        // @ts-ignore
        const result = await auth()
        if (result.error) {
            router.push('/auth/login')
        } else {
            setIsLoggedIn(true)
            // @ts-ignore
            store.dispatch(setUser(result.data.user))
        }
    }
    React.useEffect(() => {
        checkAuth()
    }, [isLoggedIn])

    // @ts-ignore
    return (
        <div className="flex">
            <Loading open={!isLoggedIn}/>
            <MyMenu children={<Dashboard/>}/>
        </div>
    )
}