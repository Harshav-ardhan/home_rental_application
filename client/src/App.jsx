import { Route, Routes } from 'react-router-dom';
import './App.css';
import Indexpage from './pages/Indexpages'; 
import Loginpage from './pages/Loginpage';
import Layout from './Layout';
import Registerpage from './pages/Registerpage';
import axios from 'axios';
import { UserContextProvider } from './Usercontext';
import AccountPage from './pages/AccountPage';
import Placesformpage from './pages/Placesformpage';
import Placespage from './pages/Placespage';
import Placepage from './pages/Placepage';
import BookingPage from './pages/BookingPage';
import Bookingspage from './pages/Bookingspage';

axios.defaults.baseURL ='http://localhost:4000'
axios.defaults.withCredentials =true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Indexpage/>}/>
          <Route path='/login' element ={<Loginpage/>}/>
          <Route path='/Register' element ={<Registerpage/>}/>
          <Route path = '/Account/:subpage?' element={<AccountPage/>}></Route>
          <Route path = '/Account/:subpage/:action' element={<AccountPage/>}></Route>
          <Route path='/Account/places/:id' element={<Placesformpage/>}></Route>
          <Route path='/Account/places/' element={<Placespage/>}></Route>
          <Route path='/places/:id' element={<Placepage/>}></Route>
          <Route path='/Account/bookings' element={<Bookingspage/>}/>
          <Route path='/accounts/booking/:id' element={<BookingPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
