import axios from 'axios';
import React, { useState } from 'react'

function Photosuploader({addedPhotos, onchange}) {
  function removephoto(ev,filename){
    ev.preventDefault();
    onchange([...addedPhotos.filter(Photo => Photo!==filename)])
  }

    const[photoLink, setPhotoLink] = useState('');
   // console.log(photoLink);
    async function AddPhotosByLink(ev){
      console.log(photoLink)
        ev.preventDefault(photoLink);
        
        const {data:filename} = await axios.post('/upload-by-link',{link: photoLink})
        
        onchange(prev=>{
          return[...prev,filename]
        });
        setPhotoLink('');
      }
      function uploadphoto(ev){
        const files = ev.target.files
        const data = new FormData();
        for(let i=0;i<files.length;i++){
          data.append('photos',files[i]);
        }
       
        axios.post('/upload', data ,{
          headers : {'content-type':'multipart/form-data'}
        }).then(respose =>{
          const{data:filenames} = respose;
          onchange(prev=>{
            return [...prev, ...filenames];
          });
        })
      }
  return (
    <>
    <h1 className='text-xl mt-4 text-red'>Photos</h1>
          <div className='flex'>
            <input value={photoLink} onChange={(ev) =>setPhotoLink(ev.target.value)} type='text' placeholder='add photos using link.....jpg'/>
            <button onClick={AddPhotosByLink} className='bg-gray-200 px-4 rounded-2xl'>Add photo</button>
          </div>

          <div className='mt-2 grid gap-2 gridcols-3 md:grid-cols-4 lg:grid-cols-6'>
            {addedPhotos.length >0 && addedPhotos.map(link=>{
              return (
              <div key={link}>
               <img className='relative rounded-2xl' src={'http://localhost:4000/uploads/' + link} alt="" />
               <button onClick={ev=>removephoto(ev,link)} className ="bg-black text-white cursor-pointer bg-opacity-80 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            )})}
            <label  className='border bg-transparent rounded-2xl p-24'>
              <input type='file' multiple onChange={uploadphoto} className='hidden'/>
              Upload</label>
          </div>

    </>
  )
}

export default Photosuploader