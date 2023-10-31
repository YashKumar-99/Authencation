import React from 'react'
import Dashboard from '../Pages/Dashboard';
import SendOtp from '../Pages/SendOtp';
import VerfiyOtp from '../Pages/VerfiyOtp';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';

import { useRoutes, Navigate } from 'react-router-dom';

import { useContext } from 'react';
import { AppContext } from '../index';

const Router = () => {

    const { AuthStatus } = useContext(AppContext);
    console.log(AuthStatus,"afd")


    return useRoutes([


        {

            path: '',
            element: AuthStatus ? (<Navigate to='/dashboard' />) : (<Navigate to='/login' />),
            children: [

                { path: '404', element: (<NotFound />) },
                { path: '*', element: <Navigate to='/404' /> }
            ]

        },

        {
            path: '/dashboard',
            element: AuthStatus ? (<Dashboard />) : (<Login />)
        },
        {
            path: '/login',
            element: AuthStatus ? (<Navigate to='/dashboard' />) : (<Login />)
        },
        {
            path: '/verifyotp',
            element: AuthStatus ? (<Navigate to='/dashboard' />) : (<VerfiyOtp/>)

        }
    ])
}

export default Router