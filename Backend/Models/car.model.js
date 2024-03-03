import mongoose from "mongoose";
const car_schema=new mongoose.Schema({
    brand:{type:String},
    model:{type:String},
    isActive:{type:Boolean},
    yearOfRegistration:{type:String},
    transmision:{type:String},
    colour:{type:String},
    fuel_type:{type:String},
    seatCapacity:{type:String},
    rentPerDay:{type:String},
    rentPerMonth:{type:String},
    photo:{type:String}
})

export default mongoose.model.cars||mongoose.model("car",car_schema)