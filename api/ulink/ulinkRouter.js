const router =require("express").Router();

const{create,getLike}=require("./ulinkControler")

router.get("/create",create )
router.get("/get",getLike )
router.get("/uplink", getLike )

  module.exports=router;