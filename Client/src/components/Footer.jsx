import styled from "styled-components";
import React from "react";
import { Facebook, Instagram, Pinterest, Twitter } from "@material-ui/icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { mobile } from '../Responsive'

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection:"column" })}

`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display:"none" })}

`
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor:"#fdf5f5a1" })}

`
const Logo = styled.div`
`
const Desc = styled.div`
  margin: 20px 0px;
`

const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`
const ContactItem=styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment=styled.img`
   width : 50%;
`
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Cart</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum culpa,
          cupiditate velit.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Usefull Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Orders</ListItem>
          <ListItem>Account</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <ContactItem><LocationOnOutlinedIcon style={{marginRight:'10px'}}/>
        Devarabeesanahalli Village,
          Bengaluru, 560103,
        </ContactItem>
        <ContactItem><PhoneEnabledOutlinedIcon style={{marginRight:'10px'}}/>
         +123 34 567
        </ContactItem>
        <ContactItem><EmailOutlinedIcon style={{marginRight:'10px'}}/>
          contact@gmail.com
        </ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
      </Right>
    </Container>
  );
};

export default Footer;
