import mongoose from "mongoose";
const bike_schema=new mongoose.Schema({
    brand:{type:String},
    model:{type:String},
    isActive:{type:Boolean},
    yearOfRegistration:{type:String},
    colour:{type:String},
    rentPerDay:{type:String},
    rentPerMonth:{type:String},
    photo:{type:String}
})

export default mongoose.model.bikes||mongoose.model("bike",bike_schema)