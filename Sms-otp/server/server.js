require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const twilio = require('twilio');
const crypto = require('crypto');//lookup  where it's comes
const jwt = require('jsonwebtoken');

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());


const smsKey = process.env.SMS_SECRET_KEY;


//So now we need two thing first is account sid and a auth token

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;


// console.log(accountSid, "and", authToken)

const Client = twilio(accountSid, authToken)
// console.log(crypto, "crypto")






const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

let refreshTokens = [];


// console.log(JWT_AUTH_TOKEN, "and", JWT_REFRESH_TOKEN)


app.post('/sendotp', (req, res) => {
    const phone = req.body.number;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 2 * 60 * 1000; //2minute
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`
    // Client.messages.create({
    //     body: `Hello Your otp is ${otp} sended by Yash Kumar,Software engineer !!`,
    //     from: +2133220271,
    //     to: phone
    // }).then((message) => console.log(message)).catch((err) => console.log(err))



    res.json({ phone, fullHash, otp });
})






app.post('/verifyotp', (req, res) => {

    const phone = req.body.phone;
    const otp = req.body.otp;//verify time entered otp
    const hash = req.body.hash;


    console.log(phone, otp, hash, "dataishere..");


    const [hashdata, expires] = hash.split('.');

    let now = Date.now();

    if (now > parseInt(expires)) {
        return res.status(504).send({ msg: 'Timeout , Please try again later..!!' })
    }


    const data = `${phone}.${otp}.${expires}`;

    const newHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

    console.log(newHash, "vs", hashdata);


    if (newHash === hashdata) {
        console.log("User is verified !!");

        const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '1y' });

        console.log(refreshToken, "beforreferh")
        refreshTokens.push(refreshToken);

        console.log(refreshTokens, "refreshtokens")


        res.status(200)
            .cookie("accessToken", accessToken, {
                expires: new Date(new Date().getTime() + 30 * 1000),
                httpOnly: true,
                sameSite: 'strict'
            })
            .cookie('refreshToken', refreshToken, {
                expires: new Date(new Date().getTime() + 31557600000),
                httpOnly: true,
                sameSite: 'strict'
            })

            //These are for send  tomporty token
            .cookie('authSession', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
            .cookie('refreshTokenID', true, {
                expires: new Date(new Date().getTime() + 31557600000),
                sameSite: 'strict'
            })
            .send({ msg: "Device verifyed!!" })
        // res.status(201).cookie('accessToken',)
    }
    // console.log(hashdata, "and", expires)
})





app.post('/refresh', (req, res) => {


    const refreshToken = req.cookies.refreshToken;
    // console.log(refreshToken, "data")

    if (!refreshToken) {
        return res.json({ msg: 'Please login to continue furture process!!' });

    }




    const refreshTokenData = jwt.verify(refreshToken, JWT_REFRESH_TOKEN);

    const { data } = refreshTokenData;

    const IndDate = parseInt(data)
    console.log(IndDate, "ddd")

    const newAccessToken = jwt.sign({ IndDate }, JWT_AUTH_TOKEN, {
        expiresIn: '30s'
    })


    console.log(newAccessToken, "newAccess")

    res.status(200)
        .cookie('accessToken', newAccessToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            httpOnly: true,
            sameSite: 'strict'
        })
        .cookie('authSession', true, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict'
        }).send({ massage: 'Verified!!' })












})



app.get('/logout', (req, res) => {



    res
        .clearCookie("refreshToken")
        .clearCookie("refreshTokenID")
        .clearCookie("authSession")
        .clearCookie("accessToken").send("Logout Succesfulll!!")




})



app.listen(5000, () => {
    console.log('Server is running at port : 5000 !!');
})