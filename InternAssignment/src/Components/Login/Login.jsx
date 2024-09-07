import React, { useState } from 'react'

import UserLogin from './UserLogin'

import AdminLogin from './AdminLogin'
const Login = () => {
    const[isAdmin,setIsAdmin] = useState(false);
    const [isUser,setIsUser] = useState(true)

    const handleclick = ()=>{
    
      setIsUser((prev)=>!prev)
    }

   
 



  return (
    <div className='Loginform'>
         <h2>LoGin </h2>
        {isUser ? <UserLogin clickFuncion = {handleclick}/> : <AdminLogin clickFuncion = {handleclick}/>}
       
      
    </div>
  )
}

export default Login
