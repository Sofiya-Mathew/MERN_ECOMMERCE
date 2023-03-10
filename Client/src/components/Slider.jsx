import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from "react";
import {sliderItems} from '../data.js'
import { mobile } from "../Responsive.js";

const Container=styled.div`
  width :100% ;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height:"80vh" })}

`
const Arrow=styled.div`
  width: 50px;
  height: 50px;
  background-color: #e5dfdf;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  opacity: 0.3;
  left: ${props=>props.direction==="left" && '10px' };
  right: ${props=>props.direction==='right' && '10px'};
  z-index: 2;
`
const Wrapper=styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props)=>props.slideIndex*-100}vw);
  transition: all 1.5s ease;
`
const Slide=styled.div`
width: 100vw;
height: 100vh;
 display : flex;
 align-items: center;
 background-color: #${(props) => props.bg};
`
const ImgContainer=styled.div`
flex: 1;
height: 100%;
`
const Image=styled.img`
  height: 80%;
`

const InfoContainer=styled.div`
flex: 1;
${mobile({ display:"none" })}

`
const Title=styled.h1`
  font-size: 70px;
`
const Desc=styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`
const Button=styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`


const Slider = () => {
  const [slideIndex,setSlideIndex]=useState(0)
  const handleClick=(direction)=>{
  if(direction=='left'){
    setSlideIndex(slideIndex>0 ? slideIndex-1 :2)
  }else{
    setSlideIndex(slideIndex<2 ? slideIndex+1 : 0)
  }
  }
  return (
    <Container>
      <Arrow direction="left" onClick={()=>{handleClick('left')}}>
<ArrowLeftOutlinedIcon/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
{sliderItems.map((items)=>(
        <Slide bg={items.bg} key={items.id}>
        <ImgContainer>
        <Image src={items.img}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{items.title}</Title>
          <Desc>{items.desc}</Desc>
          <Button>Shop Now</Button>
        </InfoContainer>
        </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={()=>{handleClick('right')}}>
<ArrowRightOutlinedIcon/>
      </Arrow>

    </Container>
  )
}

export default Slider