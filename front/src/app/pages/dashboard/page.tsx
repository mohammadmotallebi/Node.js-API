'use client'
import Dashboard from "@components/Dashboard";
import MyMenu from "@components/Menu";
import Loading from "@components/Loading";
import React from "react";

export default function async() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    // @ts-ignore
    return (
        <div className="flex">
            <Loading open={!isLoggedIn}/>
            <MyMenu children={<Dashboard/>}/>
        </div>
    )
}