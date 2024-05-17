import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import Placesformpage from './Placesformpage.jsx';

function Placespage() {
  const {action} = useParams();  
  const[places,setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/places-user').then(({data})=>{
      setPlaces(data);
    });
  },[]);
  return (
    <div>  
      {action !== 'new' && (
        <div>
        <div className='text-center'>
        <Link className='bg-primary text-white py-2 px-6 rounded-full' to = {'/account/places/new'}>
          Add new page</Link>
      </div>
      <div>{places.length>0 && places.map(place=>(
            <Link to ={'/Account/places/'+place._id} className="flex gap-4 cursor-pointer bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-32 h-32 bg-gray-200 shrik-0">
                {place.Photos.length>0 && (
                  <img className = "object-cover" src={'http://localhost:4000/uploads/'+place.Photos[0]} alt=""/>
                )}
              </div>
              <div>
              <h2 className="text-xl font-bold">{place.title}</h2>
              <p className ="text-sm ">{place.description}</p>
              </div>
            </Link>
          ))}</div>
      </div>
      )}
      <div>
      {(action === 'new') && (
        <Placesformpage/>
      )}
      </div>
      
    </div>

  )
}

export default Placespage