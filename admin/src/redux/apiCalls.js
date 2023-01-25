import { publicRequest, userRequest } from "../requestMethods"
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux"
import { loginFailure, loginStart, loginSuccess, updateUserstart, updateUsersuccess } from "./userRedux"

//LOGIN

export const login=async(dispatch,user)=>{
dispatch(loginStart())
try {
   const res=await publicRequest.post("/auth/login",user)   
   dispatch(loginSuccess(res.data))
} catch (err) {
    dispatch(loginFailure())
}
}

//GET PRODUCT

export const getProducts=async(dispatch)=>{
    dispatch(getProductStart())
    try {
       const res=await publicRequest.get("/products")
       
       dispatch(getProductSuccess(res.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
    }

    //DELETE PRODUCT

    export const deleteProducts=async(id,dispatch)=>{
        dispatch(deleteProductStart())
        try {
           const res=await userRequest.delete(`/products/${id}`)
           
           dispatch(deleteProductSuccess(res))//id
        } catch (err) {
            dispatch(deleteProductFailure())
        }
        }

     //UPDATE PRODUCT

        export const updateProducts=async(id,product,dispatch)=>{
            
            dispatch(updateProductStart())
            try {
               const res=await userRequest.put(`/products/${id}`,product)
               console.log(res.data);
               dispatch(updateProductSuccess())
            } catch (err) {
                dispatch(updateProductFailure())
            }
            }

            //ADD PRODUCT

            export const addProducts=async(product,dispatch)=>{
                dispatch(addProductStart())
                try {
                   const res=await userRequest.post("/products",product)
                   
                   dispatch(addProductSuccess(res.data))
                } catch (err) {
                    dispatch(addProductFailure())
                }
                }

                //UPDATE USER

                export const updateUser=async(user,dispatch,id)=>{
            
                    dispatch(updateUserstart())
                    try {
                       const res=await userRequest.put(`/users/${id}`,user)
                       console.log(res.data);
                       dispatch(updateUsersuccess())
                    } catch (err) {
                        dispatch(updateUsersuccess())
                    }
                    }
        