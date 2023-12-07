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


    // @ts-ignore
    return (
        <div className="flex">
            <Loading open={!isLoggedIn}/>
            <MyMenu children={<Dashboard/>}/>
        </div>
    )
}