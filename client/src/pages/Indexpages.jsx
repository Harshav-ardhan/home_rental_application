import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function IndexPage(){
    const[places, setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/places').then(response =>{
            setPlaces(response.data);
        })
    },[])
    return (
       <div className="grid gap-y-4 gap-x-8 mt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length>0 && places.map(place=>(
            <Link to={'/places/'+place._id}>
                <div>
                    {place.Photos.length>0 && (
                        <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+ place.Photos[0]} alt=""/>
                    )}
                </div>
                <h3 className="font-bold" >{place.address}</h3>
                <h5 classname="text-gray-49">{place.title}</h5>
                <h1 className ="font-bold">${place.price}</h1>
            </Link>
        ))}
       </div>
    );
}
     