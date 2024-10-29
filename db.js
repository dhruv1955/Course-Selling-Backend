const mongoose = require('mongoose');
console.log("connected");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    Email:{ type:String, unique:true},
    Password:String,
    Firstname:String,
    Lastname:String
});

const admin = new Schema({
    Email:{ type:String, unique:true},
    Password:String,
    Firstname:String,
    Lastname:String
});

const course = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    adminId:ObjectId
});

const purchase = new Schema({
    courseId:ObjectId,
    userId:ObjectId
}); 

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admins", admin);
const CourseModel = mongoose.model("courses", course);
const PurchaseModel = mongoose.model("purchases", purchase);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
};