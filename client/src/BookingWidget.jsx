import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './Usercontext';

function BookingWidget({place}) {
    const [checkin ,setCheckin]= useState('');
    const [checkout, setCheckout]= useState('');
    const[numberofguest, setnumberofguest]= useState('');
    const[name,setName] = useState('');
    const[phone,setPhone]= useState('');
    const[redirect,setRedirect] = useState('');
    const {user}=useContext(UserContext)
    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    },[user])
    let numberofnights =0;
    if(checkin && checkout){
        numberofnights = differenceInCalendarDays(new Date(checkout),new Date(checkin));
    }

    async function Bookthisplace(){
        const response = await axios.post('/booking',{
            place:place._id,checkIn:checkin,checkOut:checkout,name,
            price:numberofnights*place.price,phone
        })
        const bookingid = response.data._id
        setRedirect(`/accounts/booking/${bookingid}`);
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }

      return (
    <div>
        <div className="bg-white shadow rounded-2xl p-4 px-18 mt-6 mr-12">
    <h2 className="text-2xl text-center mb-4">Price: ${place.price}/per Night</h2>
    <div className="border border-black rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block">Check-In:</label>
                <input
                value = {checkin} onChange={ev=>setCheckin(ev.target.value)}
                type="date" className="block w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
                <label className="block">Check-Out:</label>
                <input
                value ={checkout}
                onChange={ev=>setCheckout(ev.target.value)}
                type="date" className="block w-full border border-gray-300 rounded px-4 py-2" />
            </div>
        </div>
    </div>
    <div className="mt-4">
        <label className="block text-center">Max Guests:</label>
        <input
        value={numberofguest}
        onChange={ev=>setnumberofguest(ev.target.value)} 
        type="number" className="block w-full border border-gray-300 rounded px-4 py-2" />
    </div>
    {numberofnights>0 &&(
        <div>
            <div>
                <label>Your full name</label>
                <input type="text"
                 value ={name}
                onChange={ev=>setName(ev.target.value)}
                />
            </div>
            <div>
                <label>Phone Number</label>
                <input
                type="tel"
                value={phone}
                onChange={ev=>setPhone(ev.target.value)}
                />
            </div>
        </div>
    )}
    <button onClick={Bookthisplace} className="mt-4 w-full primary text-white font-bold py-2 px-4 rounded">
        Book Now
        {numberofnights>0 &&(
            <span>${numberofnights * place.price}</span>
        )}
        </button>
</div>

    </div>
  )
}

export default BookingWidget