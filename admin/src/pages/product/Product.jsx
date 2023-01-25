import React, { useMemo } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { userRequest } from '../../requestMethods';
import { updateProducts } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';



export default function Product() {
    const location=useLocation()
    const productId=location.pathname.split("/")[2]
    const [prodStats,setProdStats]=useState([])

    const [inputs,setInputs]=useState({})
    const [cat,setCat]=useState([])
    const dispatch=useDispatch()
  
    const product=useSelector((state)=>state.product.products.find((product)=>product._id===productId))
    const [file,setImage]=useState(product.img)

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );

      useEffect(()=>{
        const getStats=async()=>{
            try {
                const res= await userRequest.get("orders/income?pid=" + productId)
                const list=res.data.sort((a,b)=>{
                    return a._id - b._id
                })
                list.map((item)=>
                setProdStats((prev)=>[
                    ...prev,
                    {name:MONTHS[item._id-1],Sales:item.total},
                ])
                )
            } catch (err) {  
                console.log(err);           
            }
        }
        getStats()
      },[productId,MONTHS])

//    console.log(file);

    const handleChange=(e)=>{
        setInputs(prev=>{
          return {...prev,[e.target.name]:e.target.value}
        })
      }

      const handleClick=(e)=>{
        e.preventDefault()
        if(file!==product.img){
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
              const product={...inputs,img:downloadURL,categories:cat};
    console.log("ll",product);
              updateProducts(productId,product,dispatch)
            });
          }
        ); 
        }else{

            const product={...inputs,img:file,categories:cat};
            console.log("leeel",product);
                      updateProducts(productId,product,dispatch)
        }      
      }
    
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={prodStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} className="productInfoImg"/>
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input name='title' type="text" placeholder={product.title} onChange={handleChange}/>

                  <label>Product Description</label>
                  <input name='desc' type="text" placeholder={product.desc} onChange={handleChange}/>
                  <label>Price</label>
                  <input name='price' type="number" placeholder={product.price} onChange={handleChange}/>

                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleChange} >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} type='files' />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} onChange={e=>setImage(e.target.files[0])}/>
                  </div>
                  <button className="productButton" onClick={handleClick} >Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
