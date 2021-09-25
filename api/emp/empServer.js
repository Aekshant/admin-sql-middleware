const pool = require("../../dbconfig")


module.exports ={
    create:(data, callBack) =>{
        var sql = "INSERT INTO emp_table (emp_id, username, start_time, end_time) VALUES (?, ?, ?, ?)";
        pool.query(sql, [data.emp_id, data.username, data.start_time,data.end_time], (err, results) => {
            if (err)
            return callBack(err);
        else
            return callBack(null,results);
        })
    },//create staff End

    get: callBack =>{
        var sql="SELECT * FROM emp_table";
        pool.query(sql,[],(err,results)=>{
            if (err) {
                callBack(err);
              }
              return callBack(null, results);
            }
          );
        },//get whole table
        getEmpById:(id,callBack)=>{
            var sql="SELECT * FROM emp_table WHERE id = ?"
            pool.query(sql,[id],(error, results) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results[0]);
              }
            );
          },//end getting by id

    update: (data, callBack) => { 
        var sql = "UPDATE emp_table set emp_id=?, username =? , start_time =? ,end_time=? WHERE id = ?";
        pool.query(sql,
          [data.body.emp_id,data.body.username,data.body.start_time,data.body.end_time,data.id],
          (error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },//end update user
      deleteEmp: (id, callBack) => {
        let sql = "DELETE FROM emp_table WHERE id = ?";
        pool.query(sql,[id],(error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          });
      }//deletes user ends here
}