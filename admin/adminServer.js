const pool = require("../dbconfig")

module.exports ={
    register:(data, callBack) =>{
        var sql = "INSERT INTO admin_tbl (name, username, password, role) VALUES (?, ?, ?, ?)";
        pool.query(sql, [data.name, data.username, data.password, data.role], (err, results) => {
            if (err)
            return callBack(err);
        else
            return callBack(null,results);
        })
    },//create staff End

    getUsers: callBack =>{
        var sql="SELECT * FROM admin_tbl";
        pool.query(sql,[],(err,results)=>{
            if (err) {
                callBack(err);
              }
              return callBack(null, results);
            }
          );
        },//get whole table

    getUserByUserId:(id,callBack)=>{
        var sql="SELECT * FROM admin_tbl WHERE id = ?"
        pool.query(sql,[id],(error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },//end getting by id


    updateUser: (data, callBack) => { 
        var sql = "UPDATE admin_tbl set name=?, username =? , role =?  WHERE id = ?";
        //console.log(data)
        pool.query(sql,
          [data.body.name,data.body.username,data.body.role,data.id],
          (error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },//end update user
      deleteUser: (data, callBack) => {
        let sql = "DELETE FROM admin_tbl WHERE id = ?";
        pool.query(sql,[data],(error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          });
      },//deletes user ends here

      login: (username, callBack) => {
        let sql="select * from admin_tbl where username = ?";
        pool.query(sql,[username],(error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
}