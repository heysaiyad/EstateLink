import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register = async(req, res)=>{
    const {username, email, password} = req.body;
    try{

    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // CREATE A NEW AND SAVE TO DB
    const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
  
      console.log(newUser);
  
      res.status(201).json({ message: "User created successfully" });
    }catch(err){
        console.log(err);
        res.status(500).send("Failed to create user");
    }
    
}

export const login = async(req, res)=>{
    const {username, password} = req.body;
    try{
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
        where:{username},
    });
    if (!user) {
        return res.status(401).json({message:"Invalid Credentials!"});
    }

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({message:"Invalid Credentials!"});
    }

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    // res.setHeader("Set-Cookie", "test=" + "myValue").json({msg:"Successfuly logged in!"})
      
    
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({
        id:user.id,
        isAdmin:false,
    }, process.env.JWT_SECRET_KEY,{expiresIn:age})

    const {password:userPassword, ...userInfo} = user;

    res.cookie("token", token, {
        httpOnly:true,
        // secure:true   -> (production me use karenge qki postman me nhi chalta hai https)
        maxAge:age,
    })
    .status(200)
    // .json({message:"Login Successful"});
    .json(userInfo);

    // res.cookie("test2", "myValue2", {
    //     httpOnly:true,
    //     // secure:true   -> (production me use karenge qki postman me nhi chalta hai https)
    //     maxAge:age,
    // })
    // .status(200)
    // .json({msg:"Login Successful"});
    }
    // catch(err){
    //     console.log(err);
    //     res.status(500).json({msg:"Failed to login!"});
    // }
    catch(err){
        console.log(err);
        res.status(500).send("Failed to login!");
    }

}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };