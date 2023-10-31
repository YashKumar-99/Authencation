import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { useContext } from 'react';

import { AppContext } from '../index.js';

const Auth = () => {

    const store = useContext(AppContext)





    const cookies = new Cookies();
    const accessToken = cookies.get('authSession');
    const refreshToken = cookies.get('refreshTokenID');
    // const accessToken = cookies.get('accessToken');
    console.log(accessToken, "authS", refreshToken)

    if (!accessToken && !refreshToken) {
        store.AuthStatus = false;
    } else if (accessToken && refreshToken) {
        store.AuthStatus = true;
    } else if (!accessToken && refreshToken) {


        axios.post('/refresh').then((res) => {
            console.log(res);
            store.AuthStatus = true;
            window.location.reload();
        }).catch(function (error) {
            console.log(error.response);
        });
    }




    return (<>
        Auth
    </>);
}

export default Auth