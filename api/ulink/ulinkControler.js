const {Customer,get} = require("./ulinkServer")
const axios = require('axios')
exports.create = (req, res) => {
   
   axios.get("http://localhost:3000/data")
    .then(function (response) {
      // handle success
      let body=response.data;
    // Create a Customer
        let customer = new Customer({
            applicationID : body.applicationID,
            applicationName : body.applicationName,
            deviceName : body.deviceName,
            devEUI:body.devEUI,
            rxInfo:JSON.stringify(body.rxInfo),
            txInfo:JSON.stringify(body.txInfo),
            adr:body.adr,
            dr:body.dr,
            fCnt:body.fCnt,
            fPort:body.fPort,
            data:body.data,
            objectJSON:JSON.stringify(body.objectJSON),
            tags:JSON.stringify(body.tags)
        });
      
  
    // Save Customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
})//axi exits
.catch(function (error) {
// handle error
console.log(error);
})
};

exports.getLike = (req, res) => {
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
}//end all user


