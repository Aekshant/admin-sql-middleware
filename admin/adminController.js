const pool = require("../dbconfig")
const { register,getUsers,getUserByUserId,updateUser,deleteUser,login}=require("../admin/adminServer")
const { hashSync, genSaltSync,compare} = require("bcrypt");
var {sign} = require('jsonwebtoken');
module.exports ={
    registration: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        pool.query('SELECT username FROM admin_tbl WHERE username ="' +body.username+'"', function (err, result) {
          if (err) throw err;
          //You will get an array. if no users found it will return.
          if(!result.length){  
        register(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
      }else{
        return res.status(500).json({
          success: 0,
          message: "Username already Exist"
        });
      }
      })
      },
      //get by id ends
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },//end all user
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 1,
          data: [],
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },//getby id ends
  updateUsers: (req, res) => {
    let inputid = req.params.id;
    let body ={body: req.body, id:inputid};
    console.log(body);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },//update ends
  deleteUser: (req, res) => {
    const data = req.params.id;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },//delete staff ends

  login: (req, res) => {
    const body = req.body;
    login(body.username, (err, results) => {
      results = results[0];
      
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid username or password"
        });
      }
      const result = compare(body.password, results.password);
      if (result) {
        results.password = undefined;
        
        const jsontoken = sign({ results } , "qwe1234", {
          expiresIn: "24h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          username:results.username,
          role:results.role
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  }
}