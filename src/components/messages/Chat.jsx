import React from "react";
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";
import Messages from "./ChatMessage";
import Input from "./MessageInput";

const Chat = () => { 
  const data = {
    user: {
      displayName: "John Doe",
    },
  }; 

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
