import React, { useEffect } from 'react'
import Perks from '../Perks.jsx'
import Photosuploader from '../Photosuploader.jsx';
import { Navigate, useParams } from 'react-router-dom'
//import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';

function Placesformpage() {
  
  const {id} = useParams();
  const[title,setTitle] = useState('');
  const[address,setAddress]= useState('');
  const[addedPhotos,setAddedPhotos] = useState([]);
  const[description,setDescription] = useState('');
  const[perks,setPerks]= useState([]);
  const[extraInfo,setExtraInfo] = useState('');
  const[checkIn,setCheckIn] = useState('');
  const[checkOut, setCheckOut] = useState('');
  const[maxGuest, setMaxGuest]= useState(1);
  const[price,setPrice] = useState(100);
  const[redirectToPlacesList,setRedirectToPlacesList] = useState(false);

  useEffect(()=>{
    if(!id){
        return;
    }
    axios.get('/places/'+id).then(response=>{
        const {data}= response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.Photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuest(data.maxGuest);
        setPrice(data.price)
    })
  },[id])

  async function savepage(ev){
    ev.preventDefault();
    const placedata ={title,address,addedPhotos,
      description,perks,extraInfo,
      checkIn,checkOut,maxGuest,price};
    if(id !== "new"){
      console.log({id});
      await axios.put('/places',{
        id,...placedata
      })
      setRedirectToPlacesList(true)
    }
    else{
      //console.log("hi");
      const {data} = await axios.post('/places', placedata
      );
      setRedirectToPlacesList(true)
    }
    
  }
  
  
  
  if(redirectToPlacesList ){
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
        <form onSubmit={savepage}>
          <h1 className='mt-4 text-xl'>Title</h1>
          <input value={title} onChange = {(ev) =>setTitle(ev.target.value)} type='text' placeholder='title for example  my lovely home'/>

          <h1 className='text-xl mt-4'>Adderess</h1>
          <input value={address} onChange={(ev) =>setAddress(ev.target.value)} type='text' placeholder='Address'/>

          <Photosuploader addedPhotos={addedPhotos} onchange={setAddedPhotos} />
          <h1 className='text-xl mt-4 text-red'>Description</h1>
          <input value={description} onChange={(ev) =>setDescription(ev.target.value)} type='text' placeholder='description'/>

          <h1 className='text-xl mt-4 text-red'>Perks</h1>
          <div className='grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
          <Perks selected={perks} onChange={setPerks}/>
          </div>

          <h1>Extra Info</h1>
          <input value={extraInfo} onChange={(ev) =>setExtraInfo(ev.target.value)} type='text' placeholder='House Rules etc'/>
          <h1 className='text-xl mt-4 text-red'>Check In and Check Out times</h1>
          <div className='grid gap-4 sm:grid-cols-4 '>
            <div>
              <h2>CheckIn time</h2>
              <input value={checkIn} onChange={(ev) =>setCheckIn(ev.target.value)} type='text' placeholder='14:00'/>
            </div>
            <div>
              <h2>CheckOut time</h2>
              <input value={checkOut} onChange={(ev)=>setCheckOut(ev.target.value)} type='text' placeholder='14:00'/>
            </div>
            <div>
              <h2>Number of guest</h2>
              <input value={maxGuest}
               onChange={(ev)=>setMaxGuest(ev.target.value)} 
               type='number' 
               placeholder='max guest'/>
            </div>
            <div>
              <h2>price per night</h2>
              <input value={price}
               onChange={(ev)=>setPrice(ev.target.value)} 
               type='number' 
               placeholder='price per night'/>
            </div>
          </div>
          <button className='primary'>save</button>
        </form>
    </div>
  )
}

export default Placesformpage