import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import '../../css/chat1.css';


import socketIO from 'socket.io-client';
const host = "http://localhost:8001";


const socket = socketIO.connect(host);

const ChatPage = () => { 
  const {userRole,userId,userChatName} = useSelector((state)=>state.userLogin);   
  const [messages, setMessages] = useState([])
  const [messages_bar, setMessages_bar] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const [chatTo, setChatTo] = useState('')
  const lastMessageRef = useRef(null);
  //console.log(userChatName)
  //let userLogin = JSON.parse(localStorage.getItem("userLogin")) 
  const socket = socketIO(host, {
		auth: {
		//	userId:userLogin.id, userRole:userLogin.role, userChatName:userLogin.first_name + " " + userLogin.last_name
    userId:userId, userRole:userRole, userChatName:userChatName
		},
    transports: [ "websocket" ]
	});


  useEffect(()=> {
    socket.on("messageResponse", data => {
      setMessages([...messages, data])
    
    })
    //setMessages_bar(messages)
    
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
    
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const chatToWhom = useCallback((id,role,name,msgId)=>{

    const msg = [...messages_bar]
   /// setMessages_bar(msg.filter(item=>item.id !==msgId))

    setChatTo({userRole:role,userId:id,userChatName:name})
  },[])

  return (
    <div className="chat">
      <ChatBar socket={socket} messages ={messages} chatToWhom={chatToWhom}/>
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} chatTo={chatTo}/>
      </div>
    </div>
  )
}

export default ChatPage