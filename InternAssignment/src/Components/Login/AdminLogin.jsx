import React from 'react'

const AdminLogin = ({clickFuncion}) => {
    const handleAdminSubmit = ()=>{

    }
  return (
    <div className='adminForm'>

        <form className='form' onSubmit={handleAdminSubmit} action=''>
         <label htmlFor="Gmail">Gmail</label>
          <input type="text"placeholder='Enter Your Gmail' id='Gmail' name= "adminGmail"/>
          <label htmlFor="password">Password</label>
          <input type="password"  placeholder='Enter Your Password' id='password'/>
          <div className="buttons">
            <button type='submit' >login</button>
            <button type='button' onClick={clickFuncion}>User ?</button>
        </div>
           
        </form>
        </div>
  )
}

export default AdminLogin
