import React, { useEffect } from 'react';
import axios from 'axios';







const Dashboard = () => {


  const LogoutHandler = () => {
    console.log("log")

    axios.get('/logout').then(() => console.log("User Logout Successfully!!")).catch((err) => console.log(err))


  }




  // useEffect(() => {

  //   async function callapi() {
  //     await axios.post('/refresh').then(() => console.log("login sucessfull!!")).catch((err) => console.log(err, "err"))

  //   }
  //   callapi();



  // }, [])


  return (
    <>
      <div>Dashboard



      </div>
      <button style={{ textAlign: 'right' }} onClick={LogoutHandler}>Logout</button>


    </>

  )
}

export default Dashboard