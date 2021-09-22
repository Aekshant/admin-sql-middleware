module.exports = {
    admin: (req, res, next) => {
    
          if(req.admin.role == "admin"){
            next();
          }else{
            return res.json({
              success: 0,
              message: "Access Denied! Unauthorized Admin"
            });
          }
        } 
      }