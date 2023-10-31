import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../index';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const VerfiyOtp = () => {


    const { getUsesDetails } = useContext(AppContext)

    const history=useNavigate();

    console.log(getUsesDetails, "getssss")
    const [otp, setOtp] = useState('');

    const HandleSubmit = async (e) => {
        e.preventDefault();



        const data = {
            otp,
            phone: getUsesDetails.phone,
            hash: getUsesDetails.fullHash
        }


        await axios.post('/verifyotp', data).then((res) => console.log(res, "result")).catch((err) => console.log(err))




        setOtp('');

        window.location.reload();
        history('/')

    }

    return (
        <div><h2> VerfiyOtp</h2>

            <form>
                <input type='text' value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button type='submit' onClick={HandleSubmit}> verify Otp</button>
            </form>


        </div>
    )
}

export default VerfiyOtp;