const { Router } = require("express");
const userRouter = Router();
const { UserModel } = require("../db");
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');

userRouter.post("/signup", async (req,res) => {
    const requirebody = z.object({
        Email:z.string().min(5).max(35).email(),
        Password:z.string().min(5).max(25),
        Firstname:z.string().min(3).max(25),
        Lastname:z.string().min(3).max(25)
    });
    const ParseData = requirebody.safeParse(req.body);
    if(!ParseData.success){
        res.json({
            message:"Invalid Format!!",
            error:ParseData.error
        });
        return
    };
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    
    let error = true;
    try{
        const hashedPass = await bcrypt.hash(Password, 10);
        await UserModel.create({
            Email:Email,
            Password:hashedPass,
            Firstname:Firstname,
            Lastname:Lastname
        });
    } catch(e){
        error = false;
        res.json({
            message:"User already exists!!"
        });
    };
    if(error){
        res.json({
            message:"You are Signed up"
        });
    };
});
    
userRouter.post("/signin", async (req,res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    const admin = await UserModel.findOne({
        Email:Email
    });
    if(!admin){
        res.json({
            message:"Invlid Email!!"
        });
        return
    };
    const PasswordMatch = await bcrypt.compare(Password,admin.Password);
    if(!PasswordMatch){
        res.json({
            message:"Invalid Password"
        });
        return
    } else {
        const token = jwt.sign({
            userId:admin._id.toString()
        },JWT_USER_PASSWORD);

        res.json({
            message:"You are signed in!!",
            token:token
        });
    };
});
    
userRouter.get("/purchases", (req,res) => {
    res.json({
        message:"Done It !!!"
    });
});


module.exports = {
    userRouter:userRouter
};