import admin_schema from './Models/admin.model.js'
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