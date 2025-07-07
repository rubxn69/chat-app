import React, { useContext } from 'react'
import './RightSideBar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const RightSideBar = () => {
  const { chatUser } = useContext(AppContext);
  
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.avatar_icon} alt="" />
        <h3>
          {chatUser?.userData?.name || "Select a chat"} 
          {chatUser && <img className='dot' src={assets.green_dot} alt="" />}
        </h3>
        <p>{chatUser?.userData?.bio || "No bio available"}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Shared Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default RightSideBar