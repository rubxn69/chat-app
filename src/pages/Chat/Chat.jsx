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

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  }

  return (
    <div className='chat'>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <>
          {/* Mobile overlay */}
          {showMobileSidebar && (
            <div 
              className={`mobile-overlay ${showMobileSidebar ? 'active' : ''}`}
              onClick={() => setShowMobileSidebar(false)}
            />
          )}
          
          <div className='chat-container'>
            {/* Desktop sidebar */}
            <div className="desktop-sidebar" style={{display: window.innerWidth > 768 ? 'block' : 'none'}}>
              <LeftSideBar />
            </div>
            
            {/* Mobile sidebar */}
            <div className={`mobile-sidebar ${showMobileSidebar ? 'active' : ''}`} style={{display: window.innerWidth <= 768 ? 'block' : 'none'}}>
              <button 
                className="mobile-close"
                onClick={() => setShowMobileSidebar(false)}
              >
                ×
              </button>
              <LeftSideBar onChatSelect={() => setShowMobileSidebar(false)} />
            </div>
            
            <ChatBox onToggleSidebar={toggleMobileSidebar} />
            
            {/* Right sidebar - hidden on mobile */}
            <div className="desktop-right-sidebar" style={{display: window.innerWidth > 768 ? 'block' : 'none'}}>
              <RightSideBar />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Chat