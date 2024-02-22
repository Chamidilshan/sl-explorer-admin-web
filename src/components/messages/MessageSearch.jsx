import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config"; 
import { AuthContext } from "../../contexts/AuthContext";

const Search = () => { 
  // const [user] = useState({
  //   displayName: "John Doe",
  //   photoURL: "https://via.placeholder.com/150",
  // });
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    console.log('started');
    const q = query(collection(db, "Users"), where("firstName", "==", userName));
   try{
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot); 
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
   }catch(e){ 
    setErr(true);
   }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async() => { 
    console.log(`user: ${user.uid}`); 
    console.log(`user: ${user.id}`); 
    console.log(`current user: ${currentUser.uid}`);

    const combineId = currentUser.uid > user.id 
      ? currentUser.uid + user.id
      : user.id + currentUser.uid;

      try{ 
        const docRef =  doc(db, "chats", combineId);
        const res = await getDoc(docRef);
       
        // if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combineId), { messages: [] });
  
          //create user chats
          await setDoc(doc(db, "userChats", currentUser.uid), {
            [combineId + ".userInfo"]: {
              uid: user.id, 
              displayName: user.firstName,  
               photoURL: user.profilePicture,
            },
            [combineId + ".date"]: serverTimestamp(),
          }, { merge: true });  
         
          await setDoc(doc(db, "userChats", user.id), { 
            [combineId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL, 
            },  
            [combineId + ".date"]: serverTimestamp(),
          }, { merge: true });  
        // } 
      } catch (err) {  
        console.error(err);
      }  
      
      setUser(null);  
      setUserName(""); 
    };


  return (
    <div className="search border-b bg-amber-500 border-gray-300">
      <div className="searchForm px-4 py-2">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={text}
          className="bg-transparent border-none text-white outline-none placeholder-gray-400"
        />
      </div>
      {err && <span>Usr not found</span>}
      {user && (
        <div className="userChat p-4 flex items-center hover:bg-gray-700 cursor-pointer" onClick={handleSelect}>
          <img src={user.profilePicture} alt="" className="w-12 h-12 rounded-full object-cover" />
          <div className="userChatInfo ml-4">
            <span className="text-xl font-semibold">{user.firstName}</span>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
 