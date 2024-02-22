import React from 'react'
import MessageNavBar from './MessageNavBar'
import MessageSearch from './MessageSearch'
import Chats from './Chats'

const MessageSideBar = () => {
  return (
    <div>
      <MessageNavBar/>
      <MessageSearch/>
      <Chats/>
    </div>
  ) 
}

export default MessageSideBar