import React, { useContext, useState } from "react";
import Img from "../../assets/img.png"; 
import Attach from "../../assets/attach.png"; 
import { AuthContext } from "../../contexts/AuthContext"; 
import { ChatContext } from "../../contexts/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }), 
      }); 
    } 

    console.log('user id is: ', data.user.uid); 

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), { 
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

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
