import React, { useRef, useEffect } from "react";

const ChatMessage = () => {
  const currentUser = {
    uid: "123",
    photoURL: "https://via.placeholder.com/150",
  };

  const data = {
    user: {
      photoURL: "https://via.placeholder.com/150",
    },
  };

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Hardcoded messages
  const messages = [
    {
      id: "1",
      senderId: "123",
      text: "Hello!",
      img: null,
    },
    {
      id: "2",
      senderId: "456",
      text: "Hi there!",
      img: "https://via.placeholder.com/150",
    },
    // Add more hardcoded messages as needed
  ];

  return (
    <div className="messages bg-gray-200 p-4 h-full overflow-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          ref={ref}
          className={`message ${message.senderId === currentUser.uid ? "owner" : ""} flex gap-4 mb-4`}
        >
          <div className="messageInfo flex flex-col text-gray-500 font-light">
            <img
              src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>just now</span>
          </div>
          <div className="messageContent flex flex-col gap-2 max-w-80">
            <p className={`p-2 rounded-lg ${message.senderId === currentUser.uid ? "bg-blue-500 text-white rounded-br-none" : "bg-white rounded-bl-none"}`}>
              {message.text}
            </p>
            {message.img && <img src={message.img} alt="" className="w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
