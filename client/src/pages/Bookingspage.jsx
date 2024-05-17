import React, { useEffect, useState } from 'react'
//import AccountPage from './AccountPage'
import axios from 'axios'
import Placeimg from './Placeimg';
import {differenceInCalendarDays, format} from "date-fns"; 

function Bookingspage() {
    const[bookings,setBookings] = useState([]);
    useEffect(()=>{
        axios.get('/bookings').then(response=>{
            setBookings(response.data)
        });
    },[]);
    
  return (
    <div>
       {bookings.length>0 && bookings.map((booking)=>(
            <div className='flex gap-2 px-1 py-2 bg-gray-400 rounded-2xl mb-4'>
            <div>
                <Placeimg place={booking.place}/>    
            </div>  
            <div className='px-2 '>
            <h2 className='py-2 text-xl font-bold'>{booking.place.title}</h2>
            <div>
            {format(new Date(booking.checkIn), 'yyyy-MM-dd')} -- {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</div>
            <div>
              Number of nights :{differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))}<br/>
              Total price : {booking.price}
            </div>
            </div>
            </div>
       )
            
       )}
      
    </div>
  )
}

export default Bookingspage