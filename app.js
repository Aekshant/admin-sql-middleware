const express = require('express');
const app = express();
 
app.use(express.json()); 
const adminRouter = require("./admin/adminRouter")
app.use("/api/admin", adminRouter);

app.get("/",function(req,res){
    res.send("hello")
})

app.listen(3000,()=>{
    console.log("server at 3000")
});