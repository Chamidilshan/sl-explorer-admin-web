import React, { useEffect, useState, useContext } from "react";
import { db } from "../../../config"; 
import { AuthContext } from "../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../contexts/ChatContext";

const Chats = () => { 

  const [chats, setChats] = useState({}); 

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
   const getChats = async () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data() || {});
    });

    return ()=>{
      unsub(); 
    };
   };

   currentUser.uid && getChats();
  }, [currentUser.uid]);    

  // console.log(Object.entries(chats)); 
  // const chats = [
  //   { 
  //     id: "1",
  //     userInfo: {
  //       displayName: "John Doe",
  //       photoURL: "https://via.placeholder.com/150",
  //     },
  //     lastMessage: {
  //       text: "Hello, how are you?",
  //     },
  //   },
  //   {
  //     id: "2",
  //     userInfo: {
  //       displayName: "Jane Smith",
  //       photoURL: "https://via.placeholder.com/150",
  //     },
  //     lastMessage: {
  //       text: "Hi there!",
  //     },
  //   },
  //   // Add more hardcoded chat objects as needed
  // ];

  const handleSelect = (u) => {
    console.log(u.uid); 
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chat flex-2">
      {/* <div className="chatInfo h-16 bg-purple-800 flex items-center justify-between px-4 text-gray-300">
        <span>Chat Title</span>
        <div className="chatIcons flex gap-4">
          <img src="https://via.placeholder.com/24" alt="" className="h-6 cursor-pointer" />
          <img src="https://via.placeholder.com/24" alt="" className="h-6 cursor-pointer" />
        </div>
      </div> */} 
      <div className="chats overflow-y-auto">
        {chats && Object.entries(chats)?.map((chat) => (
          <div className="userChat flex items-center pt-5 px-4" key={chat[0]} onClick={() => handleSelect(chat[1])}>
            <img src={chat[1].photoURL} alt="" className="w-12 h-12 rounded-full object-cover" />
            <div className="userChatInfo ml-4">
              <span className="text-lg font-semibold">{chat[1].displayName}</span>
              <p className="text-sm text-gray-400">{chat[1].lastMessage?.text}</p> 
            </div>
          </div>
        ))}
      </div>
    </div> 
  );
};

export default Chats;
 