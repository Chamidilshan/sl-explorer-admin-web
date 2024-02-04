import { useState } from 'react' 
import './App.css'
import PermanentDrawerLeft from './components/drawer.jsx'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Hotels } from './pages/Hotels'
import { Settings} from './pages/Settings.jsx'
import {CruiseShips} from './pages/CruiseShips.jsx'
import {DayTrips} from './pages/DayTrips.jsx'
import {RoundTrips} from './pages/RoundTrips.jsx'
import {Messages} from './pages/Messages.jsx'
import {NotificationCampaign} from './pages/NotificationCampaign.jsx'





function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />}></Route> 
        <Route path="/cruise-ships" exact element={<CruiseShips />}></Route>
        <Route path="/round-trips" exact element={<RoundTrips />}></Route>
        <Route path="/day-trips" exact element={<DayTrips />}></Route>
        <Route path="/hotels" exact element={<Hotels />}></Route>
        <Route path="/notification-campaign" exact element={<NotificationCampaign />}></Route>
        <Route path="/messages" exact element={<Messages />}></Route>
        <Route path="/settings" exact element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  ) 
} 

export default App
