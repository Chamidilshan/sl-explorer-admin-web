import React, { useState } from "react";

const Search = () => {
  const [user] = useState({
    displayName: "John Doe",
    photoURL: "https://via.placeholder.com/150",
  });
  const [text, setText] = useState('');

  return (
    <div className="search border-b bg-amber-500 border-gray-300">
      <div className="searchForm px-4 py-2">
        <input
          type="text"
          placeholder="Find a user"
          value="John Doe"
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent border-none text-white outline-none placeholder-gray-400"
        />
      </div>
      {user && (
        <div className="userChat p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full object-cover" />
          <div className="userChatInfo ml-4">
            <span className="text-xl font-semibold">{user.displayName}</span>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
 