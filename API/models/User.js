const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        mobile:{type:Number,required:true},
        password:{type:String,required:true},
        isAdmin:{type:Boolean,default:false},
      img:{type:String}
    },
   { timestamps:true}
)

module.exports=mongoose.model("User",userSchema)