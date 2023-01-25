import { Search} from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import {Badge} from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { mobile } from '../Responsive';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/userRedux';
const Container=styled.div`
  height: 65px;
  margin-bottom: 5px;
`
const Wrapper=styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding:"10px 0px" })}
` 
const Left=styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Center=styled.div`
flex: 1;
text-align: center;
`
const Right=styled.div`
flex: 1;
display: flex;
justify-content: flex-end;
align-items: center;
${mobile({ justifyContent:"center",flex:'2' })}

`

const Language=styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display:"none" })}

`
const MenuItem=styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize:"12px" ,marginLeft:'6px'})}

`

const SearchContainer=styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left:25px;
padding: 5px;
background-color: white;
`
const Input=styled.input`
border: none;
${mobile({ width:"50px" })}
outline: none;
`
const Logo=styled.h1`
font-weight: bold;
${mobile({ fontSize:"20px" })}

`

const Navbar = () => {
  const quantity=useSelector(state=>state.cart.quantity)
  const dispatch=useDispatch()
   const navigate=useNavigate()
  const handleClick=(e)=>{
    e.preventDefault()
    dispatch(logout())
    navigate("/login")
  }

  return (
    <Container>
      <Wrapper>
     <Left>
      <Language>EN</Language>
      <SearchContainer>
       <Input placeholder='search'/>
        <Search style={{color:'grey',fontSize:16}}/>
      </SearchContainer>
     </Left>
     <Center>
      <Logo>Deal Cart</Logo>
     </Center>
     <Right>
      <Link to={"/register"} style={{textDecoration:"none",color: 'inherit'}}>
      <MenuItem>Register</MenuItem>
      </Link>
      <Link style={{textDecoration:"none",color: 'inherit'}} to={"/login"}>
      <MenuItem>Sign In</MenuItem>
      </Link>
      <Link to={'/cart'}>
      <MenuItem>
      <Badge overlap='rectangular' badgeContent={quantity} color="primary">
  <ShoppingCartOutlinedIcon />
</Badge>
      </MenuItem>
      </Link>
      <Link to={"/login"} style={{textDecoration:"none",color: 'inherit'}} >
      <MenuItem onClick={handleClick}>Sign Out</MenuItem>
      </Link>
     </Right>

      </Wrapper>
      </Container>
  )
}

export default Navbar