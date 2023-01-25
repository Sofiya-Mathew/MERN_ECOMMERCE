import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/apiCalls'
import {  useNavigate } from 'react-router-dom' 
import styled from 'styled-components'

const Container=styled.div`
display:flex;
align-items:center;
justify-content: center;
height:calc(100vh-10px);
color:black;
flex-direction: column;
margin-top: 30px;
`

const Wrapper=styled.div`
display:flex;
align-items:center;
flex-direction: column;
justify-content: center;
height:calc(50vh);
background-color: #fffbfb;
padding:15px 70px;
border: 1px solid black;
gap:10px;`

const Title= styled.h2`
font-size:20px;
`


const Input=styled.input`
border:1px solid ${({theme})=>theme.soft};
border-radius:5px;
padding: 10px;
color:black ;
background-color: transparent;
width: 100%;
caret-color: black;
`

const Button=styled.button`
border-radius: 5px;
border: none;
padding: 10px 20px;
cursor: pointer;
font-weight: 500;
background-color:${({theme})=>theme.soft} ;
color: grey;
`


const Login = () => {
    const [username,setusername]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleClick= (e)=>{
      e.preventDefault()
      login(dispatch,{username,password})
      navigate("/")
    }

console.log(username);
  return (
    <Container>
    <Wrapper>
    <Title>LOGIN</Title>
        <Input style={{padding:'10px',marginBottom:'20px'}} type='text' placeholder='username' onChange={(e)=>setusername(e.target.value)}/>
        <Input style={{padding:'10px',marginBottom:'20px'}} type='password' placeholder='password'  onChange={(e)=>setPassword(e.target.value)}/>
        <Button style={{padding:'10px',width:'100px'}} onClick={handleClick}>Login</Button>
    </Wrapper>
    </Container>

  )
}

export default Login