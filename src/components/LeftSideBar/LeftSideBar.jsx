import React, { useContext, useState } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, where, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeftSideBar = ({ onChatSelect }) => {
  const navigate = useNavigate();
  const { userData, chatData, chatUser, setChatUser, setMessagesId, messagesId } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value.trim();
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);

        if (!querySnap.empty) {
          const foundUser = querySnap.docs[0].data();
          if (foundUser.id !== userData.id) {
            const alreadyExists = chatData?.some(chat => chat.rId === foundUser.id);
            if (!alreadyExists) {
              setUser(foundUser);
              return;
            }
          }
        }

        setUser(null); // No result or already exists
      } else {
        setShowSearch(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const addChat = async () => {
    if (!user) return;
    try {
      const messagesRef = collection(db, "messages");
      const newMessageRef = doc(messagesRef);

      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: []
      });

      const chatsRef = collection(db, "chats");

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true
        })
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true
        })
      });

      toast.success("Chat started!");
      setShowSearch(false);
      setUser(null);
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to add chat:", error);
    }
  };

  const setChat = async (item) => {
    setMessagesId(item.messageId)
    setChatUser(item)
    if (onChatSelect) {
      onChatSelect(); // Close mobile sidebar when chat is selected
    }
  }

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" className='logo' />
          <div className="menu">
            <img src={assets.menu_icon} alt="menu" />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p onClick={() => {/* Add logout logic */}}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="search" />
          <input onChange={inputHandler} type="text" placeholder='Search users...' />
        </div>
      </div>

      <div className="ls-list">
        {showSearch && user ? (
          <div onClick={addChat} className='friends add-user'>
            <img src={user.avatar || assets.profile_img} alt="profile" />
            <div>
              <p>{user.name}</p>
              <span>Click to start chat</span>
            </div>
          </div>
        ) : (
          chatData?.map((item, index) => (
            <div 
              onClick={() => setChat(item)} 
              className={`friends ${chatUser?.messageId === item.messageId ? 'active' : ''}`} 
              key={index}
            >
              <img src={item.userData?.avatar || assets.profile_img} alt="profile" />
              <div>
                <p>{item.userData?.name || "Unknown User"}</p>
                <span>{item.lastMessage || "No message yet"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;