import { useState, useContext } from 'react' 
import './App.css';
import PermanentDrawerLeft from './components/drawer.jsx';
import { Routes, BrowserRouter, Route, useNavigate, Navigate } from 'react-router-dom';
import { Home } from './pages/Home'
import { Hotels } from './pages/Hotels'
import { Settings} from './pages/Settings.jsx'
import {CruiseShips} from './pages/CruiseShips.jsx'
import {DayTrips} from './pages/DayTrips.jsx'
import {RoundTrips} from './pages/RoundTrips.jsx'
import {Messages} from './pages/Messages.jsx'
import {LoginPage} from './pages/LoginPage.jsx' 
import {NotificationCampaign} from './pages/NotificationCampaign.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './contexts/AuthContext.jsx'; 

function App() {

  const [count, setCount] = useState(0);
  const {currentUser} = useContext(AuthContext); 
 
  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to='/login'/>
  }

  console.log('current user:', currentUser);
 
  return (
    <> 
    <BrowserRouter>  
      <Routes>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>}></Route> 
        <Route path="/cruise-ships" exact element={<RequireAuth><CruiseShips /></RequireAuth>}></Route>
        <Route path="/round-trips" exact element={<RequireAuth><RoundTrips /></RequireAuth>}></Route>
        <Route path="/day-trips" exact element={<RequireAuth><DayTrips /></RequireAuth>}></Route>
        <Route path="/hotels" exact element={<RequireAuth><Hotels /></RequireAuth>}></Route>
        <Route path="/notification-campaign" exact element={<RequireAuth><NotificationCampaign /></RequireAuth>}></Route> 
        <Route path="/messages" exact element={<RequireAuth><Messages /></RequireAuth>}></Route>
        <Route path="/settings" exact element={<RequireAuth><Settings /></RequireAuth>}></Route>
      </Routes>
    </BrowserRouter>  
    <ToastContainer position='top-right'></ToastContainer> 
    </>
  ) 
} 

export default App
