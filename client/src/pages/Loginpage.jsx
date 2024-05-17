import axios from 'axios';
import { useState,useContext } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { UserContext } from '../Usercontext';

export default function Loginpage(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser}= useContext(UserContext)

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const response=await axios.post('/login' ,{email,password});
            await setUser(response.data)
            
            //console.log(name);
            alert('login successful')
            setRedirect(true);
        }
        catch{
            alert('login failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">LogIn</h1>

            <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
            <input type = "email" 
                placeholder={'your@email'} 
                value={email}
                onChange={ev => setEmail(ev.target.value)} />
            <input type = "password" 
                placeholder={"password"}
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>
            <button className="primary">LogIn</button>
            <div className="text-center py-2 text-gray-500">
                don't have an account yet? <Link className="underline text-black" to ='/Register'>Register now</Link>
            </div>
            </form>
            
            </div>
        </div>
    )
}