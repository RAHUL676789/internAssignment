import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav1" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav1">
                  <ul class="navbar-nav">
                      <li class="nav-item active">
                          <a class="nav-link" href="#"> <i class="fa-solid fa-house"></i> Dasgboard </a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#"> <i class="fa-regular fa-calendar-days"></i> View Avaiability</a>
                      </li>
                     
                    
                  </ul>
              </div>
          </nav>
      
    </div>
  )
}

export default AdminDashboard
