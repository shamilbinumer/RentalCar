import mongoose from "mongoose";
const vehicle_schema=new mongoose.Schema({
    type:{type:String},
    brand:{type:String},
    model:{type:String},
    yearOfRegistration:{type:Number},
    colour:{type:String},
    fuel_type:{type:String},
    rentPerDay:{type:Number},
    rentPerMonth:{type:Number},
    photo:{type:String}
})

export default mongoose.model.vehicles||mongoose.model("vehicle",vehicle_schema)