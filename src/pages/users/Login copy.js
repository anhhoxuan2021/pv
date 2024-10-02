import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { getUserByEmail} from '../../features/user/userLoginSlice';


const UserLogin = ({socket}) => {
    const {userLogin,userChatName} = useSelector((state)=>state.userLogin);   
    const navigate = useNavigate();

    const dispatch  = useDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(getUserByEmail(email));
        if(userLogin.email === email){
            socket.emit("newUser", {userChatName, socketID: socket.id})
            navigate("/chat");
        }
    }

    return(
        <div className='row justify-content-center bg-white pt-4 min-h-700'>
            <div className='col-md-6'>
            <form className='justify-content-center ' onSubmit={handleSubmit}>
                <input className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-outline-primary mt-3' type="submit">Login</button>
                </div>
                
            </form>
            </div>
        </div>
    )
}

export default UserLogin;
