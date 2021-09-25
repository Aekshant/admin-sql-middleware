const {create,get,update,deleteEmp,getEmpById} =require("./empServer");
const pool = require("../../dbconfig")
module.exports ={
    createEmp: (req, res) => {
        const body = req.body;
        pool.query('SELECT emp_id FROM emp_table WHERE emp_id ="' +body.emp_id+'"', function (err, result) {
          if (err) throw err;
          //You will get an array. if no users found it will return.
          if(!result.length){  
            
          create(body, (err, results) => {
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
          message: "emp_id already Exist"
        });
      }
      })
      },//creation ends

  getEmps: (req, res) => {
    get((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getEmpById: (req, res) => {
    const id = req.params.id;
    getEmpById(id, (err, results) => {
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
      return res.json({
        success: 1,
        data: results
      });
    });
  },//getting ends
  updateEmp: (req, res) => {
    let id = req.params.id;
    let body ={body: req.body,id:id};
    update(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },//updation ends
  deleteEmp: (req, res) => {
    const id = req.params.id;
    deleteEmp(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "emp deleted successfully"
      });
    });
  }//delete staff ends
}