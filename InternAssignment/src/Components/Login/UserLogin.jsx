// import { ConnectionStates } from 'mongoose';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const UserLogin = ({clickFuncion}) => {

  const [email,setEmail] = useState("");

  const navigate = useNavigate();

  const handleUserSubmit = async (e) => {
    e.preventDefault(); 

    const userData = { email };
    if(!email){
        alert("email is requiresd");
        return;
    }
   console.log(userData);
    try {
       
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

       

        if (response) {
            const result = await response.json();
            console.log(result);
            navigate(`/${result.id}`,{state:{user:result.currentUser,loggedIn:true,userId:result.id}});
        } else {
            console.log('Request failed');
           
        }
    } catch (error) {
        console.log('Error:', error);
       
    }
};

 

 


  return (
    <div className='userForm'>

        <form className='form needs-validation' noValidate>
            <label htmlFor="Gmail">Gmail</label>
           <input
            type="email"
            placeholder='Enter Your Gmail' 
            id='Gmail' 
            name= "userGmail" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="form-control"
            /> 
           
           <div className="buttons">
            <button type='submit' onClick={handleUserSubmit}>login</button>
            <button type='button' onClick={clickFuncion}>Admin ?</button>
        </div>
      
        </form>
       
    </div>
  )
}

export default UserLogin
