import React from 'react'

function Placeimg({place}) {
    if(!place.Photos?.length){
        return '';
    }
  return (
    <div>
        <img src={'http://localhost:4000/uploads/'+place.Photos[0]} />
    </div>
  )
}

export default Placeimg