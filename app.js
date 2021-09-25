const express = require('express');
const app = express();
var cors = require('cors')
 
app.use(cors({
    origin: "*"
}))
app.use(express.json()); 
const adminRouter = require("./admin/adminRouter")
const ulinkRouter = require("./api/ulink/ulinkRouter")
const empRouter = require("./api/emp/empRouter")
app.use("/api/admin", adminRouter);
app.use("/api/ulink",ulinkRouter)
app.use("/api/emp",empRouter)
app.get("/",function(req,res){
    res.send("hello")
})

app.listen(4000,()=>{
    console.log("server at 4000")
});