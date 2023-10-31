import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useContext } from 'react';
import { AppContext } from '..';


const SendOtp = () => {


    const [number, UpdateNumber] = useState('');
    const Obj = useContext(AppContext);


    console.log(Obj, "update is this...!!");

    // update(number);




    let history = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();

        UpdateNumber('');

        const data = {
            number
        }

        await axios.post('/sendotp', data).then((res) => {

            if (res.status === 200) {

                const userData = res.data;

                Obj.getUsesDetails = { ...userData };
                console.log(res, "res is this");


                history('/page/verifyotp')


            }
        }


        ).catch((err) => console.log(err, "err is this"))


        if (number) {
            history('/verifyotp')
        }

    }

    return (
        <div><h2> Please fill Your mobile number to  continue...!!</h2>

            <form>
                <input type='text' value={number} onChange={(e) => UpdateNumber(e.target.value)} />
                <button type='submit' onClick={HandleSubmit}> Send Otp</button>
            </form>


        </div>
    )
}

export default SendOtp