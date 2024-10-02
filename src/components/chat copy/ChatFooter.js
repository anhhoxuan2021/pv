import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getUserByEmail} from '../../features/user/userLoginSlice';


const ChatFooter = ({socket}) => {
    const {userLogin,userName,userChatName} = useSelector((state)=>state.userLogin);   
    const [message, setMessage] = useState("")
   // const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)
    const handleTyping = () => socket.emit("typing",`${userChatName} is typing`)

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && userChatName !='') {
        socket.emit("message", 
            {
            text: message, 
            name: userChatName,//localStorage.getItem("userName"), 
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id
            }
        )
        }
        setMessage("")
    }
  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder='Write message' 
            className='message' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            />
            <button className="sendBtn">SEND</button>
        </form>
     </div>
  )
}

export default ChatFooter