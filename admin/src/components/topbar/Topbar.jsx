import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userRedux";

const Button=styled.button`
border-radius: 5px;
border: none;
padding: 10px 20px;
cursor: pointer;
font-weight: 500;
background-color: #dfdbdba1 ;
color: grey;
margin-left: 5px;
`


export default function Topbar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleClick= (e)=>{
    e.preventDefault()
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        <Button  onClick={handleClick}>LOGOUT</Button>
        </div>
      </div>
    </div>
  );
}
