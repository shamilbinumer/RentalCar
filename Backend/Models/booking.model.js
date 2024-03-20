import mongoose from "mongoose";
const booking_schema=new mongoose.Schema({
   pickupLocation:{type:String},
   dateForBooking:{type:Date},
   name:{type:String},
   email:{type:String},
   number:{type:String},
   alternateNumber:{type:String},
   idProof:{type:String},
   Payment:{type:String}

})

export default mongoose.model.bookings||mongoose.model("booking",booking_schema)