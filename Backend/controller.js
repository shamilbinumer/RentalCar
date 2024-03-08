import admin_schema from './Models/admin.model.js'
import car_schema from './Models/car.model.js'
import bike_schema from './Models/bike.model.js'
import cust_schema from './Models/cust.model.js'
import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken";
const {sign}=pkg


///////////////////admin-registration///////////////////

export async function AddAdmin(req,res){
    try {
        const {username,email,phone,password}=req.body;
        console.log(username,email,phone,password);
        if(!(username&&email&&phone&&password))
        return res.status(404).send("fields are empty")
    
        bcrypt.hash(password,10)    
        .then((hashedPwd)=>{
            admin_schema.create({username,email,phone,password:hashedPwd});
        })
        .then(()=>{
            res.status(201).send("sucessfully registered")
        })
      .catch((error)=>{
        res.status(500).send(error)
       })
        
       } catch (error) {
        console.log(error);
    
    }
    
}

///////////////////admin-login////////////////////////


export async function AdminLogin(req, res) {
    try {
     console.log(req.body);
     const { email, password } = req.body;
     const usr = await admin_schema.findOne({ email })
     console.log(usr);
     if (usr === null) return res.status(404).send("email or password doesnot exist");
     const success =await bcrypt.compare(password, usr.password)
     console.log(success);
     const {username}=usr
     if (success !== true) return res.status(404).send("email or password doesnot exist");
     const token = await sign({ username }, process.env.JWT_KEY, { expiresIn: "24h" })
     console.log(username);
     console.log(token);
     res.status(200).send({ msg: "successfullly login", token })
    //  res.end();
     
    } catch (error) {
     console.log(error);
}
}

////////////////user-auth/////////////

export async function userAuth(req,res)
{
  try {
    
     const{username}=req.user;
    res.status(200).send({msg:`${username}`})
   } 
   catch (error) {
    res.status(404).send(error)
  }
}

//////////////add-vehicle///////////////

export async function AddCar(req, res) {
  try {
     const { ...vehicledetails } = req.body;
    const task=await car_schema.create({ ...vehicledetails });
    console.log(task);
    res.status(200).send({result : task});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

/////////////add bike//////////////////

export async function AddBike(req, res) {
  try {
     const { ...vehicledetails } = req.body;
    const task=await bike_schema.create({ ...vehicledetails });
    console.log(task);
    res.status(200).send({result : task});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

/////////////get All Car//////////////

export async function getAllRecords(req, res) {
  const { type } = req.params;
  try {
      let schema;
      if (type === 'car') {
          schema = car_schema;
      } else if (type === 'bike') {
          schema = bike_schema;
      } else {
          return res.status(400).send('Invalid type specified');
      }
      
      const records = await schema.find();
      res.status(200).send(records);
  } catch (error) {
      res.status(500).send(error);
  }
}
///////////get full details of car/////////////

export async function getVehicleDetails(req, res) {
  const { id, type } = req.params; // Assuming you pass the type of vehicle (car or bike) as a parameter

  try {
    let task;
    if (type === 'car') {
      task = await car_schema.findOne({ _id: id });
    } else if (type === 'bike') {
      task = await bike_schema.findOne({ _id: id });
    } else {
      return res.status(400).json({ error: 'Invalid vehicle type' });
    }

    if (!task) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

////////////////////delete vehicle////////////////////

export async function deleteVehicle(req,res)
{
    const{id,type}=req.params;
  try {
    let task;
    if(type==='car'){
     task=await car_schema.deleteOne({_id:id});
    } else if (type==='bike'){
     task=await bike_schema.deleteOne({_id:id})
    } else {
     return res.status(400).json({error:'invalid vehicle type'})
    }
 
    if(!task){
     return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

///////////////////////edit VehicleDetails/////////////////////

export async function editDetails(req, res) {
  const { type, id } = req.params;
  try {
      let schema;
      if (type === 'car') {
          schema = car_schema;
      } else if (type === 'bike') {
          schema = bike_schema;
      } else {
          return res.status(400).send('Invalid type specified');
      }
      
      const updatedData = req.body;
      const value = await schema.updateOne({ _id: id }, { $set: updatedData });
      res.status(200).send(value);
  } catch (error) {
      res.status(404).send(error);
  }
}

/////////////////cust-reg////////////////////

export async function AddCustomer(req,res){
  try {
      const {fullName,email,phone,image,password}=req.body;
      console.log(fullName,email,phone,image,password);
      if(!(fullName&&email&&phone&&password))
      return res.status(404).send("fields are empty")
  
      bcrypt.hash(password,10)    
      .then((hashedPwd)=>{
          cust_schema.create({fullName,email,phone,image,password:hashedPwd});
      })
      .then(()=>{
          res.status(201).send("sucessfully registered")
      })
    .catch((error)=>{
      res.status(500).send(error)
     })
      
     } catch (error) {
      console.log(error);
  
  }
  
}

////////////////////cust-login///////////////

export async function custLogin(req, res) {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const usr = await cust_schema.findOne({ email });
    console.log(usr);
    if (usr === null) return res.status(404).send("Email or password does not exist");
    const success = await bcrypt.compare(password, usr.password);
    console.log(success);
    const { fullName,_id } = usr;
    if (success !== true) return res.status(404).send("Email or password does not exist");
    const token = await sign({ fullName,_id }, process.env.JWT_KEY);
    console.log(token);
    res.status(200).send({ msg: "Successfully logged in", token });
    // res.end();

  } catch (error) {
    console.log(error);
  }
}

///////////////cust Auth/////////////////

export async function CustAuth(req,res)
{
  try {
    
     const{fullName,_id}=req.user;
    res.status(200).send({msg:`${fullName}`,id:`${_id}`})
   } 
   catch (error) {
    res.status(404).send(error)
  }
}

//////////////get One Cust//////////////

export async function getOneCust(req,res){
  const{id}=req.params;
  console.log(id);
  let task=await cust_schema.findOne({_id:id})
  console.log(task);
  res.status(200).send(task)
}