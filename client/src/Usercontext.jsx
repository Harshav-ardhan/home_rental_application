import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [ready,setReady] = useState();

  useEffect(()=>{
    if(!user){
    axios.get('/profile').then(({data})=>{
      setUser(data);
      setReady(true);
    })
    }
  },[])
  return (
    <UserContext.Provider value={{ user, setUser , ready}}>
      {children}
    </UserContext.Provider>
  );
}
