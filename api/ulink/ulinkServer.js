const pool = require("../../dbconfig");
var moment = require('moment');
var format = require('format');
// constructor
var Customer = function(customer) {
    this.applicationID = customer.applicationID;
    this.applicationName = customer.applicationName;
    this.deviceName = customer.deviceName;
    this.devEUI=customer.devEUI;
    this.rxInfo=customer.rxInfo
    this.txInfo=customer.txInfo;
    this.adr=customer.adr;
    this.dr=customer.dr;
    this.fCnt=customer.fCnt;
    this.fPort=customer.fPort;
    this.data=customer.data;
    this.objectJSON=customer.objectJSON;
    this.tags=customer.tags;
  };
  
  Customer.create = (newCustomer, result) => {
    pool.query("INSERT INTO ulink_table SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      result(null, {newCustomer });
    });
  };
  module.exports ={ Customer,
    get: callBack =>{
      let sql = "SELECT * FROM ulink_table ,emp_table WHERE ulink_table.`emp_id` = emp_table.`emp_id`"
      pool.query(sql, (err, rows) => {
        if (err) {
          callBack(err);
        }
        let data=[]
        rows.forEach(post=>{
          let hour = new Date(post.current_time).getHours();
          let minute = new Date(post.current_time).getMinutes();
          let check= moment(hour+":"+minute,'HH:mm')      
          let start = moment( post.start_time, 'HH:mm')
          let end =moment(post.end_time, 'HH:mm')
          var minutesOfDay = function(m){
          return m.hours()*60+m.minutes() ;
          }
          if( minutesOfDay(check) >= minutesOfDay(start) && minutesOfDay(check) <= minutesOfDay(end)){
           data.push({id:post.emp_id,status:"confirm"})
          }else{
            data.push({id:post.emp_id,status:"Not confirm"})
          }
        })
        return callBack(null,data)
      })
      }//get whole table
  };