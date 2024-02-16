import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext"; 
import { ChatContext } from "../../contexts/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
   <div
  ref={ref} 
  className={`message flex items-center justify-end gap-4 pt-4 pb-2 ${message.senderId === currentUser.uid && "owner"}`}
>
  <img 
    src={
      message.senderId === currentUser.uid
        ? currentUser.photoURL
        : data.user.photoURL
    }
    alt=""
    className="w-10 h-10 rounded-full object-cover"
  />
  <div className="messageContent max-w-80 flex flex-col gap-2">
    <p className={`p-2 rounded-lg ${message.senderId === currentUser.uid ? "bg-blue-500 text-white" : "bg-white text-gray-900"}`}>{message.text}</p>
    {message.img && <img src={message.img} alt="" className="w-1/2" />}
  </div>
  <span className="text-gray-400">just now</span>
</div>
  ); 
};

export default Message;
 