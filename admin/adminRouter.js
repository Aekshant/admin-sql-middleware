const router =require("express").Router();
const {registration,getUsers,getUserByUserId,updateUsers,deleteUser,login}=require("./adminController")
const {checkToken}=require("../middleware/validation")//validation
const {admin}=require("../middleware/admin")



router.get("/all", checkToken, admin, getUsers);
router.post("/create", checkToken, admin, registration);
router.get("/getid/:id", checkToken, admin,getUserByUserId);
router.put("/update/:id", checkToken, admin,updateUsers);
router.delete("/delete", checkToken,admin,deleteUser)

router.post("/login",login);


module.exports=router;