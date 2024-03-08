import mongoose from "mongoose";
const cust_schema=new mongoose.Schema({
    fullName:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    image:{type:String},
})

export default mongoose.model.customers||mongoose.model("customer",cust_schema)