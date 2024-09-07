import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loggedIn,userId} = location.state || {};

    const handleLinkClick = async () => {
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const data = await response.text(); // Use .text() to handle plain text response
            console.log(data);
            
            // Navigate to a different page after a successful response
            navigate("/login");  // Assuming you want to redirect to "/home" after login
          } else {
            console.log('Request failed');
          }
        } catch (e) {
          alert("There was an error with the request");
        }
      };

      const handleAvaialableClick = async()=>{
       
        try {
          const response = await fetch(`http://localhost:8080/${userId}/availability`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if(response){
            const result = await response.json();
            console.log(result);
            

            navigate(`/${result.userId}/availability`,{state:{userId:result.userId,data:result.data}});
          }
        
        }
          catch(e){

          }


      }

    return (
        <div className='home'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                      

                       {loggedIn && <li class="nav-item">
                            <li><Link to={`/${userId}/availability`} className='li' onClick={handleAvaialableClick}><i class="fa-regular fa-calendar-days"></i>&nbsp;My Schedule</Link></li>
                        </li> }

                       {loggedIn ? null : <li className='nav-item'>
                            <li><Link to="/login"  className='li' onClick={handleLinkClick}> <i class="fa-solid fa-right-to-bracket"></i> login</Link></li>

                        </li>}

                        <div className="nav-item">
                            {loggedIn && <li><span className='li'><i class="fa-solid fa-user"></i>&nbsp;{user}</span></li>}
                        </div>



                    </ul>
                </div>
            </nav>

           
        </div>
    )
}

export default Navbar
