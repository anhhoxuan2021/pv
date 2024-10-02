import React, {useState, useRef, useEffect,useMemo} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NoneImg from '../../images/qcode.png'
import EditIcon from "../../images/edit_icon.svg"

import { apiImgPath } from '../../apiPath';

import { fetchProfile, newProfile,fetchProfileID, updateProfile, setPermission, setRole } from '../../features/user/profileSlice';

const UserPofile = () => {  

  const dispatch  = useDispatch();
  const [avatarURL, setAvatarURL] = useState('');
  const [avatarFile, setAvatarFile] = useState('');
  const [avatarFlag, setAvatarFlag] = useState(false);
 // const [avatarName, setAvatarName] = useState('');
  const [keyValue, setKeyValue] = useState({});

  const [isRole11, setIsRow11] = useState(false)
  const [isRole22, setIsRow22] = useState(false)
  const [isRole33, setIsRow33] = useState(false)

 // const [isChecked, setChecked] = useState(false);

  const {loading, profile, profileID,
    isRole1, isRole2, isRole3, isPermission } = useSelector((state)=>state.profile);   

  const fileUploadRef = useRef();

  const {id} = useParams()
  
  useEffect(()=>{
    document.body.className = '#e9ecef';    
    if(id !=undefined && id !=''){
     let data = dispatch(fetchProfileID(id))
     data.then(
      function(value) { 
        let avatarPath = apiImgPath  + 'user/'+ value.payload.avatar
        setAvatarURL(avatarPath)

        if(value.payload.role ==='1'){
          setIsRow11(true)
          setIsRow22(false)
          setIsRow33(false)
        }else if(value.payload.role==='2'){
          setIsRow11(false)
          setIsRow22(true)
          setIsRow33(false)
        }else if(value.payload.role==='3'){
          setIsRow11(false)
          setIsRow22(false)
          setIsRow33(true)
        }

      },
      function(error) { /* code if some error */ }
    );
      
    }
  },[])

  useEffect(()=>{
    setAvatarURL(NoneImg)
  },[])

  ////////////
  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }
  ////////////
  const loadProfile = (event) => {
		var reader = new FileReader();
		reader.onload = () =>{
		  //var output = document.getElementById('output');
		 // output.src = reader.result;
     setAvatarURL(reader.result)
		};
		reader.readAsDataURL(event.target.files[0]);
   // setAvatarName(event.target.files[0].name)
    setAvatarFile(event.target.files[0])
    setAvatarFlag(true)
	  };

    ////////////
    const handleInputChange =(event, roleField) => {
      const target = event.target;
      const name = target.name;
      let value = event.target.value;
      if(name==="permission"){
        if(event.target.checked){
          value = 1
        }else{
          value = 0
        }
      }

      if(name==="role"){
        value = roleField
        if(roleField==='1'){
          setIsRow11(true)
          setIsRow22(false)
          setIsRow33(false)
        }else if(roleField==='2'){
          setIsRow11(false)
          setIsRow22(true)
          setIsRow33(false)
        }else{
          setIsRow11(false)
          setIsRow22(false)
          setIsRow33(true)
        }
      }

      setKeyValue((prevInputValues)  => ({
        ...prevInputValues ,
       [name]:value
      }))
    }

    ////////////
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(avatarFlag) {
        keyValue.avatar = avatarFile
        //keyValue.fileName=avatarName
      }
      if(id !==undefined) {
        keyValue.id = id
        await dispatch(updateProfile(keyValue))
      }else{
        let data =  await dispatch(newProfile(keyValue))
      }    
     // console.log(data.payload.id)
    }

  return (
    <div className='container bg-white pt-4 min-h-700'>
      <div className='row'>
            <div className='col-md-6 relative'>
              <div className='div-parent-200 relative'>
                  <img src={avatarURL}  alt="Anh Ho" />
                  <img className='h-35 z-index-20 absolute-rb0' src={EditIcon}  alt="Edit" onClick={(e)=>handleImageUpload(e)} />
              </div> 
              <input 
                type="file"
                id="file"
                ref={fileUploadRef}
                onChange ={(event)=>loadProfile(event)}
                hidden />
            </div>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col'>
                  <label>First name:</label>
                  <input type="text" className='form-control' name="first_name" defaultValue={profile.first_name}
                  onChange={(e)=>handleInputChange(e)} />
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <label>Last name:</label>
                  <input type="text" className='form-control' name="last_name" defaultValue={profile.last_name}
                   onChange={(e)=>handleInputChange(e)} />
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <label>Email:</label>
                  <input type="text" className='form-control' name="email" defaultValue={profile.email}
                   onChange={(e)=>handleInputChange(e)} />
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <label>Phone:</label>
                  <input type="text" className='form-control' name="phone" defaultValue={profile.phone}
                   onChange={(e)=>handleInputChange(e)} />
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                <Form.Check
                  inline
                  label="Default"
                  type="radio"
                  name="role"
                  value="1"
                  checked ={isRole11}
                  onChange={(e)=>handleInputChange(e,'1')} 
                />
                 <Form.Check
                  inline
                  label="Custom"
                  type="radio"
                  name="role"
                  value="2"
                  checked ={isRole22}
                  onChange={(e)=>handleInputChange(e,'2')} 
                />
                 <Form.Check
                  inline
                  label="No rates"
                  type="radio"
                  name="role"
                  value="3"
                  checked ={isRole33}
                  onChange={(e)=>handleInputChange(e,'3')} 
                />                    
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col'>
                <Form.Check        
                  label="Permission"
                  type="checkbox"
                  name="permission"
                  checked ={isPermission}
                  onChange={()=>dispatch(setPermission(!isPermission))} 
                />
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col'>
                   <Button variant="outline-primary" onClick={((e)=>handleSubmit(e))}>Submit</Button>{' '}
                </div>
              </div>

            </div>  
          </div>

    </div>
   
   
  )
}

export default UserPofile;