const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { courseRouter } = require("./routes/course");
const { userRouter }  = require("./routes/user");
const { adminRouter }  = require("./routes/admin");
app.use(express.json());

app.use("/user", userRouter); 
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main(){
    await mongoose.connect("mongodb+srv://dhruvyadav042905:Gc3rgHxottezZTS7@cluster0.uywm5.mongodb.net/My-course-database");
    app.listen(3000);
    console.log("Listening on port 3000");
}
main();

