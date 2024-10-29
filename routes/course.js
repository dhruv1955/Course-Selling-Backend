const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db")
const { PurchaseModel } = require("../db")

courseRouter.post("/purchase", (req,res) => {
    res.json({
        message:"Done It !!!"
    });
});
    
    
courseRouter.get("/preview", (req,res) => {
    res.json({
        message:"Done It !!!"
    });
});


module.exports = {
    courseRouter:courseRouter
};
