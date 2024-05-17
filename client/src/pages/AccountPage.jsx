import React, { useContext, useState } from 'react'
import { UserContext } from '../Usercontext'
import { Link,Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Placespage from './Placespage'

function AccountPage() {
  const [redirect,setRedirect] = useState(false)
    const {user, ready,setUser} = useContext(UserContext)
    let {subpage} = useParams();
    if(subpage === undefined){
      subpage= 'profile';
    }

    async function logout(){
      await axios.post('/logout');
      setRedirect('true');
      setUser(null);
    }
    
    if(ready && !user && redirect){
      return <Navigate to = {'/login'}/>
    }

    if(!ready){
      return("loading....")
    }
     
    // if(ready && !user && !redirect){
    //   return <Navigate to={'/login'}/>
    // }

    function linkclasses(type){
      let classes ='py-2 px-6'
      if(type===subpage ){
        classes += ' bg-primary rounded-full'
      }
      else{
        classes += ' bg-gray-300 rounded-full'
      }
      return classes;
    }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkclasses('profile')}to ='/account'> profile</Link>
        <Link className={linkclasses('bookings')} to ='/account/bookings'>bookings</Link>
        <Link className={linkclasses('places')}to ='/account/places'>my acodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          logged as {user.name} ({user.email})<br/>
          <button onClick={logout} className='primary max-w-sm mt-2'>Log Out</button>
        </div>
      )}
      {subpage === 'places' && (
        <Placespage/>
      )}
    </div>
  )
}

export default AccountPage