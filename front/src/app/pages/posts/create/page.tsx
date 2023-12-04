'use client'
import * as React from 'react';
import Create from './create';
import MyMenu from "@components/Menu";
export default () => {
    return (
        <div>
            <MyMenu children={<Create/>}/>
        </div>
    );
};