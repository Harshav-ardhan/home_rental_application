export default function Perks({selected,onChange}){
  function handleCbClick(ev){
    const{checked, name} = ev.target;
    if(checked){
      onChange([...selected,name]);  
    }
    else{
      onChange([...selected.filter(selectName => selectName !==name)])  
    }
    
  }
    return(
        <>
        <label className='border px-2 flex py-4 rounded-2xl'>
              <input type='checkbox' checked = {selected.includes('pets')} name="pets" onChange={(handleCbClick)} />
              <span>pets</span>
            </label>
          
          
            <label className='border px-2 flex py-4 rounded-2xl'>
              <input type='checkbox' checked = {selected.includes('parking')} name="parking" onChange={(handleCbClick)}/>
              <span>Free parking</span>
            </label>
          
          
            <label className='border px-2 flex py-4 rounded-2xl'>
              <input type='checkbox' checked = {selected.includes('wifi')} name="wifi" onChange={(handleCbClick)}/>
              <span>Wifi</span>
            </label>
          
         
            <label className='border px-2 flex py-4 rounded-2xl'>
              <input type='checkbox' checked = {selected.includes('entrance')} name="entrance" onChange={(handleCbClick)}/>
              <span>Private Enterance</span>
            </label>
         
            <label className='border px-2 flex py-4 rounded-2xl'>
              <input type='checkbox' checked = {selected.includes('air conditioning')} name="air conditioning" onChange={(handleCbClick)}/>
              <span>Air Conditioning</span>
            </label>
        </>
    )
}