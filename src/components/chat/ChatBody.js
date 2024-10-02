
import React, { memo} from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import {setUserChatName} from '../../features/user/userLoginSlice';

const ChatBody = ({messages, typingStatus, lastMessageRef}) => { 
 
  const navigate = useNavigate()
  const dispatch  = useDispatch();
  const {userLogin,userChatName} = useSelector((state)=>state.userLogin);   

  const handleLeaveChat = () => {
    //localStorage.removeItem("userName")
    dispatch(setUserChatName(''))
    navigate("/")
    window.location.reload()
  }
  
  return (
    <>
      <header className='chat__mainHeader'>
          <p>Hangout with Colleagues</p>
          <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
        </header>


        <div className='message__container'>
          {messages.map(message => (
            message.userChatName === userChatName ? (
              <div className="message__chats" key={message.id}>
                <p className='sender__name'>You</p>
                <div className='message__sender'>
                    <p>{message.text}</p>
                </div>
              </div>
            ): (
              <div className="message__chats" key={message.id}>
                <p>{message.userChatName}</p>
                <div className='message__recipient'>
                    <p>{message.text}</p>
                </div>
              </div>
            )
            ))}

          <div className='message__status'>
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </>
  )
}

export default memo(ChatBody)