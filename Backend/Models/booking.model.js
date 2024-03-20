import mongoose from "mongoose";
const booking_schema=new mongoose.Schema({
   cust_id:{type:String},
   prod_id:{type:String},
   pickupLocation:{type:String},
   dateForBooking:{type:String},
   name:{type:String},
   email:{type:String},
   number:{type:String},
   alternateNumber:{type:String},
   idProof:{type:String},
   Payment:{type:String}

})

export default mongoose.model.bookings||mongoose.model("booking",booking_schema)