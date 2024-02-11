import React from "react";

const Chats = () => {
  const chats = [
    { 
      id: "1",
      userInfo: {
        displayName: "John Doe",
        photoURL: "https://via.placeholder.com/150",
      },
      lastMessage: {
        text: "Hello, how are you?",
      },
    },
    {
      id: "2",
      userInfo: {
        displayName: "Jane Smith",
        photoURL: "https://via.placeholder.com/150",
      },
      lastMessage: {
        text: "Hi there!",
      },
    },
    // Add more hardcoded chat objects as needed
  ];

  const handleSelect = (user) => {
    // Dispatch action
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
        {chats.map((chat) => (
          <div className="userChat flex items-center pt-5 px-4" key={chat.id} onClick={() => handleSelect(chat.userInfo)}>
            <img src={chat.userInfo.photoURL} alt="" className="w-12 h-12 rounded-full object-cover" />
            <div className="userChatInfo ml-4">
              <span className="text-lg font-semibold">{chat.userInfo.displayName}</span>
              <p className="text-sm text-gray-400">{chat.lastMessage?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div> 
  );
};

export default Chats;
 