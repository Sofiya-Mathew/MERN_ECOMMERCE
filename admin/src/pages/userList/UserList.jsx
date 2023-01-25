import React, { useEffect } from 'react';
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userRequest } from '../../requestMethods';

export default function UserList() {
  const [data, setData] = useState(userRows);
  const [users,setUsers]=useState([])
  const [orders,setOrders]=useState([])

  // useEffect(()=>{
  //   const getOrders=async()=>{
  //     try {
  //       const res=await userRequest.get("orders")
  //       console.log(res.data,"jjjjjjjjjjjjjjjjjjj");
  //       setOrders(res.data)
  //     } catch (err) {
        
  //     }
  //   }
  //   getOrders()
  // },[])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 100,  },
    {
      field: "img",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.img}
          </div>
        );
      },
      
      
    },
    { field: "email", headerName: "Email", width: 200, },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "amount",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];


  useEffect(()=>{
    const getUsers=async()=>{
      const res=await userRequest.get("users")
      setUsers(res.data)
    }
    getUsers()
  },[])


  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
