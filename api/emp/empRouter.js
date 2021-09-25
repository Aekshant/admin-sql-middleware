const {createEmp,getEmps,updateEmp,deleteEmp,getEmpById} =require("./empController")
const router =require("express").Router();

router.post("/empCreate",createEmp);
router.get("/getEmps" ,getEmps);
router.get("/empid/:id",  getEmpById)
router.put("/empUpdate/:id", updateEmp);
router.delete("/empDelete/:id", deleteEmp);
//router.post("/login", login);
module.exports=router;