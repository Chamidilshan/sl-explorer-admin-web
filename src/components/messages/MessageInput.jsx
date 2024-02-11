import React, { useState } from "react";
import Img from "../../assets/img.png";
import Attach from "../../assets/attach.png";  

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    // Hardcoded user and chat data
    const currentUser = {
      uid: "123",
    };
    const data = {
      chatId: "chat123",
      user: {
        uid: "456",
      },
    };

    // Simulate sending message logic
    console.log("Sending message:", text);

    // Reset input fields
    setText("");
    setImg(null);
  };

  return (
    <div className="input h-16 bg-white px-4 flex items-center justify-between">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="w-full outline-none text-gray-700 text-lg"
      />
      <div className="send flex items-center gap-4">
        {/* Hardcoded icons */} 
        <img src={Img} alt="Attach" className="h-6 cursor-pointer" />
        <img src={Attach} alt="Image" className="h-6 cursor-pointer" />
        <button onClick={handleSend} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer">Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
