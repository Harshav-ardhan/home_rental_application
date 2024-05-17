import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget';

function Placepage() {
    const {id} = useParams();
    const [place,setPlace] =useState(null);
    const [showAllPhoto,setShowAllPhoto] = useState(false);
    console.log({id});
    useEffect(()=>{
        //console.log("n");
        if(!id){
            return;
        }
            axios.get('/places/'+id).then(response=>{
                setPlace(response.data);
            })
    },[id])
    if(!place) return'';
    if(showAllPhoto){
        return(
            <div className="absolute bg-white min-w-full min-h-screen" >
                <button onClick={()=>setShowAllPhoto(false)} className="flex gap-3 px-4 py-2 rounded-2xl" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                </svg>
                close Photos</button>

                <h2>Photos of :{place.title}</h2>
                <div className="grid gap-4 justify-center">
                {place?.Photos?.length>0 && place.Photos.map(photo=>(
                    <div className="flex justify-center items-center w-full h-48">
                        <img className="w-full h-full object-cover" src={'http://localhost:4000/uploads/'+photo} alt="" />
                    </div>
                ))}
                </div>
            </div>
        )
    }
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
        <h2 className="text-3xl">{place.title}</h2>
        <a className="flex gap-3 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
           <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
           </svg>
        {place.address}</a>
        <div className="grid gap-2 grid-cols-4">
            <div className="flex items-center">
                {place.Photos?.[0] && (
                    <div>
                        <img className="w-full h-48 object-cover" src={'http://localhost:4000/uploads/'+ place.Photos[0]} alt=""/>
                    </div>
                   
                )}
            </div>
            <div>
                {place.Photos?.[1] && (
                    <div>
                        <img className="w-full h-48 object-cover" src={'http://localhost:4000/uploads/'+ place.Photos[1]} alt=""/>
                    </div>
                    
                )}
            </div>
            <div>
                {place.Photos?.[2] && (
                    <div>
                        <img className="w-full h-48 object-cover" src={'http://localhost:4000/uploads/'+ place.Photos[2]} alt=""/>
                    </div>
                    
                )}
    
    </div>
        <button onClick={()=>setShowAllPhoto(true)} className="flex gap-1 justify-center px-4 py-20 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                show more photos
            </button>
        </div>
        <div className="flex gap-2 justify-between">
        <div>
        <div className="my-6 flex-grow-0 flex-shrink-0 w-1/2">
            <h2 className="font-bold text-2xl ">Description</h2>
            {place.description}
        </div>
        <div className="grid grid-cols-2">
            <div>
            CheckIn Time:{place.checkIn}<br/>
            CheckOut Time:{place.checkOut}<br/>
            MaxGuest:{place.maxGuest}
            </div>
        </div>  
        <div>
            <h2 className="font-bold text-2xl mt-4">ExtraInfo</h2>
            {place.extraInfo}
        </div>
        </div>
        <BookingWidget place={place}/>
        </div>
    </div>
  );
}

export default Placepage