import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getUserByEmail} from '../../features/user/userLoginSlice';
import socketIOClient from "socket.io-client";
import '../../css/chat.css';
import { random } from "lodash";
const host = "http://localhost:8001";
//const socket = io("localhost:8001", { transports: ["websocket"] });

const ChatBox = ()=> {
  const {userLogin} = useSelector((state)=>state.userLogin);   
  console.log(userLogin)
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  const socketRef = useRef();
  const messagesEnd = useRef();
  const room_id = random(10) + '-room' +

  useEffect(() => {
    socketRef.current = socketIOClient(host);  
  
    socketRef.current.on('getId', data => {
      setId(data)
    }) //// phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat

    socketRef.current.on('sendDataServer', dataGot => {
      if(dataGot.room_id === room_id){
        setMess(oldMsgs => [...oldMsgs, dataGot.data])
        scrollToBottom()
      }
     
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if(message !== null) {
      const msg = {
        content: message, 
        id: id,
        room_id:room_id
      }
      socketRef.current.emit('sendDataClient', msg)
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  

  const renderMess =  mess.map((m, index) => 
        <div key={index} className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}>
          {m.content}
        </div>
      )

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      sendMessage()
    }
  }

  return (
    <div className="box-chat">
      <div className="box-chat_message">
      {renderMess}
      <div style={{ float:"left", clear: "both" }}
             ref={messagesEnd}>
        </div>
      </div>

      <div className="send-box">
          <textarea 
            value={message}  
            onKeyDown={onEnterPress}
            onChange={handleChange} 
            placeholder="Nhập tin nhắn ..." 
          />
          <button onClick={sendMessage}>
            Send
          </button>
      </div>

    </div>
  );
}

export default ChatBox;