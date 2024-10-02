import React, {useState, useEffect} from 'react'

const ChatBar = ({socket, messages, chatToWhom}) => {
    const [users, setUsers] = useState([])

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

  return (
    <div className='chat__sidebar'>
        <h2>Open Chat</h2>
        {users}
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users' >
                {messages.map(msg => <p key={msg.id} style={{cursor:"pointer"}} 
                onClick={()=>chatToWhom(msg.userId,msg.userRole,msg.userChatName,msg.id)}>{msg.userChatName}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar