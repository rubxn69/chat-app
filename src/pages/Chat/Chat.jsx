import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { AppContext } from '../../context/AppContext'

const Chat = () => {
  const {chatData, userData} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(()=>{
    if (chatData && userData) {
      setLoading(false)
    }
  },[chatData,userData])

  const handleChatSelect = () => {
    setShowMobileSidebar(false);
  }

  const handleToggleSidebar = () => {
    setShowMobileSidebar(true);
  }

  return (
    <div className='chat'>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <>
          {/* Mobile overlay */}
          <div 
            className={`mobile-overlay ${showMobileSidebar ? 'active' : ''}`}
            onClick={() => setShowMobileSidebar(false)}
          />
          
          <div className='chat-container'>
            {/* Desktop sidebar - always visible on desktop */}
            <div className="desktop-sidebar">
              <LeftSideBar />
            </div>
            
            {/* Mobile sidebar */}
            <div className={`mobile-sidebar ${showMobileSidebar ? 'active' : ''}`}>
              <LeftSideBar onChatSelect={handleChatSelect} />
            </div>
            
            {/* Chat box with mobile toggle */}
            <ChatBox onToggleSidebar={handleToggleSidebar} />
            
            {/* Right sidebar - hidden on mobile */}
            <div className="desktop-right-sidebar">
              <RightSideBar />
            </div>
          </div>
        </>
      )}
    </div>
  )
}