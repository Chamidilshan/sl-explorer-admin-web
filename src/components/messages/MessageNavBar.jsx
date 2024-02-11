import React, { useContext } from 'react'
import {auth} from '../../../config'
import {AuthContext} from '../../contexts/AuthContext'
const MessageNavbar = () => {
  // Hardcoded user data
  const currentUser =   useContext(AuthContext);
 
  return (
    <div className="sidebar flex flex-1 bg-blue-800 relative">
  <div className="navbar flex items-center bg-blue-700 h-16 px-4 justify-between text-white">
    <span className="logo font-bold">Lama Chat</span>
    <div className="user flex gap-2">
      <img src={currentUser.profilePicture} alt="User" className="h-6 w-6 rounded-full object-cover bg-gray-200" />
      <span>{currentUser.firstName}</span>
      <button className="bg-purple-700 text-white text-xs px-2 py-1 border-none cursor-pointer">Logout</button>
    </div>
  </div>
</div>
  )
}

export default MessageNavbar
