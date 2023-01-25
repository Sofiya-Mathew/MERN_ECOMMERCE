import React, { useState } from 'react'
import styled from 'styled-components'
import {mobile} from '../Responsive.js'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../Redux/apiCalls.js'
import { useNavigate } from 'react-router-dom'

const Container=styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url('https://i.postimg.cc/BnV5Bjkx/smiling-attractive-woman-stylish-colorful-outfit-jumping-with-shopping-bags-pink-yellow-background-p.jpg');
    background-repeat: no-repeat;
   background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ backgroundSize:"contain" })}

`
const Wrapper=styled.div`
   padding : 20px;
   width: 25%;
   background-color: white;
   ${mobile({ width:"75%" })}
   border-radius: 10px;
   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input=styled.input`
   flex : 1;
   min-width: 40%;
   margin:10px 0px;
   padding: 10px;
   border-radius: 10px;
   border-color: lightgray;

`
const Form=styled.form`
    display: flex;
    flex-direction: column;
`
const Button=styled.button`
    width: 40%;
    padding: 15px 20px;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 10px;
    &:disabled{
      color: green;
      cursor: not-allowed;
    }
`
const Link=styled.a`
  margin: 5px 3px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
const Links=styled.div`
`
// const Error=styled.span`
// color: red;
// `

const Login = () => {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isFetching,error,currentUser}=useSelector((state)=>state.user)
  

  const handleClick=(e)=>{
    e.preventDefault()
    if(!username && !password ){
      alert("inputs fields cannot be empty")
      navigate("/login")
    }else{
      login(dispatch,{username,password})
      if(currentUser.username===username){
        navigate("/")
      }else{
        alert("wrong credentials")
      }
    }
      }
  
  return (
    <Container>
    <Wrapper>
      <Title>Sign In</Title>
      <Form>
        <Input placeholder="user name" onChange={(e)=>setUsername(e.target.value)} name='username'/>
        <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} name='password'/>
        <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
        <Links>
        <Link>Forget password?</Link>
        <Link>Create account</Link>
        </Links>
      </Form>
    </Wrapper>
  </Container>

  )
}
export default Login