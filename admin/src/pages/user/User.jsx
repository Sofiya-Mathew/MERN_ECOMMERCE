import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import Moment from 'react-moment';
// import 'moment-timezone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./user.css";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function User() {
  const [inputs,setInputs]=useState({})
  const [file,setImage]=useState(null)
  const dispatch=useDispatch()

  const location=useLocation()
    const id=location.pathname.split("/")[2]

  const [users,setUsers]=useState([])

  useEffect(()=>{
    const getUsers=async()=>{
      const res=await userRequest.get(`users/find/${id}`)
      setUsers(res.data)
    }
    getUsers()
  },[])

  useEffect(()=>{
    const editUsers=async()=>{
      const res=await userRequest.put(`users/${id}`)
      setUsers(res.data)
    }
    editUsers()
  },[])

  const handleChange=(e)=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  
  const handleClick=(e)=>{
    e.preventDefault()
    if(file!==users.img){
        const fileName=new Date().getTime()+file?.name;

        console.log(fileName);
        const storage=getStorage(app)
        const storageRef=ref(storage,fileName)
    
        const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user={...inputs,img:downloadURL};
console.log("ll",user);
          updateUser(user,dispatch)
        });
      }
    ); 
    }else{

        const user={...inputs,img:file};
        console.log("leeel",user);
                  updateUser(user,dispatch)
    }      
  }


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{users.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">{users._id}</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{users.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
              <Moment parse="YYYY-MM-DD">
              {users.createdAt}
              </Moment>
              </span>
            </div>
            
                
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{users.mobile}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{users.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{users.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={users.username}
                  className="userUpdateInput" onChange={handleChange} name="username"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={users.email}
                  className="userUpdateInput" onChange={handleChange} name="email"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={users.mobile}
                  className="userUpdateInput" onChange={handleChange} name="mobile"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={users.address}
                  className="userUpdateInput" onChange={handleChange} name="address"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={users.img}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={e=>setImage(e.target.files[0])}/>
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
