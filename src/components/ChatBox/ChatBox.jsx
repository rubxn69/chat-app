import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

const ChatBox = ({ onToggleSidebar }) => {
  const {userData, messagesId, chatUser, messages, setMessages} = useContext(AppContext)
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db,'messages',messagesId),{
          messages: arrayUnion({
            sId:userData.id,
            text:input,
            createdAt:new Date()
          })
        })

        const userIDs = [chatUser.rId,userData.id];
        userIDs.forEach(async (id)=>{
          const userChatsRef = doc(db,'chats',id)
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data()
            const chatIndex = userChatData.chatsData.findIndex((c)=>c.messageId === messagesId);
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0,30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef,{
              chatsData:userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
    setInput("");
  }

  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour>12) {
      return hour-12 + ":" + minute.toString().padStart(2, '0') + " PM"
    }
    else {
      return hour + ":" + minute.toString().padStart(2, '0') + " AM"
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db,'messages',messagesId),(res)=>{
        setMessages(res.data().messages.reverse())
      })

      return ()=>{
        unSub();
      }
    }
  },[messagesId])

  return chatUser ? (
    <div className='chat-box'>
      {/* Mobile header */}
      <div className="mobile-header">
        <button className="mobile-menu-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <img src={assets.avatar_icon} alt="" />
        <p>{chatUser.userData.name}</p>
      </div>

      {/* Desktop header */}
      <div className="chat-user">
        <img src={assets.avatar_icon} alt="" />
        <p>{chatUser.userData.name} <img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} alt="" />
      </div>

      <div className="chat-msg">
        {messages.map((msg,index)=>(
          <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
            <div className="msg-container">
              <div className='msg'>{msg.text}</div>
              <div className="msg-time">{convertTimestamp(msg.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input 
          onChange={(e)=>setInput(e.target.value)} 
          value={input} 
          type="text" 
          placeholder='Type a message...' 
          onKeyPress={handleKeyPress}
        />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt="Gallery"/>
        </label>
        <button className="send-btn" onClick={sendMessage}>
          <img src={assets.send_button} alt="Send" />
        </button>
      </div>
    </div>
  ) : (
    <div className='chat-welcome'>
      <img src={assets.logo_icon} alt="Logo"/>
      <p>Welcome to Chat App</p>
      <span>Select a conversation to start chatting</span>
    </div>
  )
}

export default ChatBox