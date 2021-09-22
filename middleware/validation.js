const jwt = require("jsonwebtoken");

const pool = require("../dbconfig")
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    
    if (token) {
      token = token.slice(7);
      jwt.verify(token,"qwe1234", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
        req.admin = decoded.results;
        var sql = "SELECT * FROM admin_tbl where id = '"+ req.admin.id +"'";
        pool.query(sql,[],(err,results)=>{
          // console.log(results[0]);
          req.admin = results[0];
            next();
        });
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Invalid Token! Unauthorized User"
      });
    }
  }
};