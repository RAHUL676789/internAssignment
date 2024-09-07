import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { useState } from 'react';
const AvailabilityForm = () => {

  const location = useLocation();
  const { userId, data } = location.state || {};

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];

  const CurrentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(CurrentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(CurrentDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const [selectedDate, setSelectedDate] = useState(CurrentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [slots, setSlots] = useState([]);
  const [update, setUpdate] = useState(false);


  useEffect(() => {
    if (data) {
      setSlots(data);
    }
  }, [data]);

  const [currUser, setCurrUser] = useState("");

  const handleSubmitSchedule = async (e) => {
    e.preventDefault();
    console.log(startTime);
    console.log(endTime);

    const slotData = { startTime, endTime };
    console.log(slotData);

    try {
      let response = await fetch(`http://localhost:8080/user/${userId}/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slotData),
      })
      // console.log(await response.json())
      let slotinfo = await response.json();
      console.log(slotinfo)
      alert(slotinfo.msg);
      setSlots(slotinfo.data);
      setCurrUser(slotinfo.user);
      setStartTime(null);
      setEndTime(null)
      setShowEventPopup(false);
    }
    catch (e) {

    }

  }
  const handleClicked = (day) => {
    const clickDate = new Date(currentYear, currentMonth, day + 1);
    const today = new Date();

    if (clickDate >= today || isSameDay(clickDate, today)) {
      setSelectedDate(clickDate);
      setShowEventPopup(true);
      setUpdate(false)
      console.log("true")
      console.log(clickDate)



    } else {
      console.log("fallse")
    }
  }

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  }

  const handleCloseClick = () => {
    setShowEventPopup(false);
   

  }

  const handleUpdateClick = async (e,id) => {
    e.preventDefault();
    console.log(id);

    console.log("use update");

    try {


      const response = await fetch(`http://localhost:8080/user/edit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      })

      if (response) {
        setUpdate(true);
        setShowEventPopup(true)
        if(e.target.id === id){
          console.log(id);
        }
        
      }

    } catch (e) {
      alert("there is sometign error cannot update your schedule");
    };

  }

 
  const handleDeleteClick = () => {

  }

  return (
    <div className='Availabilty'>
      <div className="timing">
        <h2>Set Your Availability</h2>
        <div className="date">
          <h3>{monthOfYear[currentMonth]}</h3> <h3>{currentYear}</h3>
        </div>



        <div className="weekdays">
          {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
        </div>

        <div className="days">

          {[...Array(firstDayOfMonth).keys()].map((_, index) => <span key={`empty${index}`} />)}

          {[...Array(daysInMonth).keys()].map((day) => <span key={day + 1}
            className={day + 1 === CurrentDate.getDate() && currentMonth === CurrentDate.getMonth()
              && currentYear === CurrentDate.getFullYear() ? "current-date" : null

            } onClick={() => handleClicked(day)}>
            {day + 1}</span>)}

        </div>



        {showEventPopup && <div className={update ? "updatepopu" : "event-popup"}>
          <div className="close" onClick={handleCloseClick}><i class="fa-solid fa-x"></i></div>
          <form onSubmit={handleSubmitSchedule}> <div className="time-input">

            <div className="event-popup-time"> Start Time </div>



            <input type="datetime-local"
              name="hours"
              className="hours"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}

            />



          </div>

            <div className="time-input">

              <div className="event-popup-time"> End Time </div>

              <input type="datetime-local"
                name="hours" min="0"
                max="24" className="hours"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}


              />


            </div>
            <div className="buttons">
              
              {update ? <button type='submit' >Update</button> : <button type='submit'>Add</button>}
            </div>
          </form>
        </div>} </div>

      <div className="schedule">
        <h1> <h5 className='user'>{currUser} Your Schedule</h5></h1>
        {slots.length > 0 ? slots.map((slot) => (
          <div className="slot" key={slot._id} >
            
            <h4 className='duration'>Duration &nbsp;{slot.duration}</h4>
            <div className="tim">
              {update ? <form>
                   <input type="datetime-local" />  
                   <input type="datetime-local" />
                   <div className="buttons"><button>update</button>
                   </div>
              </form> : <div> <h4 className='start'>From {slot.start.split("T").join("-")}</h4>
                <h4 className='end'> To {slot.end.split("T").join("-")}</h4> </div> } 
            </div>

            <div className="frm">
              <form action="">
                <div className="buttons">
                  <button className='butt' onClick={(e)=>handleUpdateClick(e,slot._id)} type='button'id={slot._id}><i class="fa-regular fa-pen-to-square"></i> Update</button>
                  <button className="butt" onClick={handleDeleteClick}><i class="fa-solid fa-delete-left"></i> Delete</button>
                </div>
                {}
              </form>

              
            </div>
            

          </div>

          

        )) : null}




      </div>
     
    </div>

  )
}

export default AvailabilityForm
