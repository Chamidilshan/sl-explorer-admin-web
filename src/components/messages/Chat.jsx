import React, { useContext } from "react";
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";
import Messages from "./ChatMessages";
import Input from "./MessageInput";
import { ChatContext } from "../../contexts/ChatContext";

const Chat = () => { 

  const { data } = useContext(ChatContext); 

  return (           
    <div className="chat flex-2">
      <div className="chatInfo h-16 bg-purple-800 flex items-center justify-between px-4 text-gray-300">
        <span>{data.user?.displayName}</span>           
        <div className="chatIcons flex gap-4">
          <img src={Cam} alt="Camera" className="h-6 cursor-pointer" />
          <img src={Add} alt="Add" className="h-6 cursor-pointer" />
          <img src={More} alt="More" className="h-6 cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
