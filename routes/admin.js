const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db")
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async (req,res) => {
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
        await AdminModel.create({
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
    
adminRouter.post("/signin", async (req,res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    const user = await AdminModel.findOne({
        Email:Email
    });
    if(!user){
        res.json({
            message:"Invlid Email!!"
        });
        return
    };
    const PasswordMatch = await bcrypt.compare(Password,user.Password);
    if(!PasswordMatch){
        res.json({
            message:"Invalid Password"
        });
        return
    } else {
        const token = jwt.sign({
            userId:user._id.toString()
        },JWT_ADMIN_PASSWORD);

        res.json({
            message:"You are signed in!!",
            token:token
        });
    };

});
    
adminRouter.post("/course",adminMiddleware ,async (req,res) => {
    const adminId = req.createrId;
    const {title, description, imageUrl, price} = req.body;
    const cource = await CourseModel.create({
        title, description, imageUrl, price , createrId:adminId
    })
    res.json({
        message:"Cource Created !!",
        courceId:cource._id
    });
});
    
adminRouter.put("/course", (req,res) => {
    res.json({
        message:"Done It !!!"
    });
});
adminRouter.get("/course/bulk", (req,res) => {
    res.json({
        message:"Done It !!!"
    });
});

module.exports = {
    adminRouter:adminRouter
};