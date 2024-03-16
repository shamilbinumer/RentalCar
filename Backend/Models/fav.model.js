import mongoose from "mongoose";
const fav_schema=new mongoose.Schema({
  cust_id:{type:String},
  Product_id:{type:String},
  brand:{type:String},
  type:{type:String},
  model:{type:String},
  rentPerDay:{type:String},
  rentPerMonth:{type:String},
  photo:{type:String}
})

export default mongoose.model.favourites||mongoose.model("favourite",fav_schema)