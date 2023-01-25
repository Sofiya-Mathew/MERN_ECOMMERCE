import styled from 'styled-components'
import React, { useState } from 'react'
import {mobile} from '../Responsive.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Container=styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url('https://i.postimg.cc/CMsQH4Nk/girl-holds-fashion-shopping-bag-beauty.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ backgroundSize:"contain" })}

`
const Wrapper=styled.div`
   padding : 20px;
   width: 40%;
   background-color: white;
   ${mobile({ width:"75%" })}
   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
border-radius: 10px;
   /* ${mobile({ padding:"10px" })} */


`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input=styled.input`
   flex : 1;
   min-width: 40%;
   margin: 20px 10px 0px 0px;
   padding: 10px;
   border-radius: 10px;
   border-color: lightgray;
   ${mobile({ margin:"10px 10px 0px 0px",padding: '5px 10px' })}

`
const Form=styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Agreement=styled.span`
  font-size  : 12px;
  margin: 20px 0px;
  ${mobile({ fontSize:"10px",margin:' 10px 0px'})}

`
const Button=styled.button`
    width: 40%;
    padding: 15px 20px;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    border-radius: 10px;
`


const Register = () => {
  const [user,setUser] = useState({})
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setUser(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

console.log(user);
//register function 
const register = async()=>{
try {
  await axios.post("http://localhost:5000/api/auth/register",user)
} catch (err) {
  console.log(err);
}
}

const NavigateLogin=(e)=>{
  e.preventDefault()
   navigate("/login")
}
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="user name" name="username" onChange={handleChange}/>
          <Input placeholder="email" name="email"  onChange={handleChange}/>
          <Input placeholder="address"name="address" onChange={handleChange}/>
          <Input placeholder="mobile" name="mobile" onChange={handleChange}/>
          <Input placeholder="password" name="password" onChange={handleChange}/>
          <Input placeholder="confirm password"/>
          <Agreement>
            By creating an account, I consent to the proccessing of my personal data 
            in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button  onClick={register}>CREATE</Button>
          <div style={{marginLeft:"5px",marginTop:"5px"}}>Already have an account? <span onClick={NavigateLogin} style={{backgroundColor:"aliceblue",padding:"5px 5px",cursor:"pointer"}}>Sign in</span> </div>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register