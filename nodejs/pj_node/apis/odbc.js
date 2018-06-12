const util = require('util');
const odbc = require('odbc');
const config = require('../config/environment');
const db = new odbc.Database();

exports.connect = () => {
  db.open(config.tibero, err => {
    if(err){
      console.log("TIBERO connect FAIL");
      console.log(err);
      return;
    }
    console.log("TIBERO connected");
    db.close(()=>{});
  });
};

exports.IchairportFindAndCountAll = (result, callback) => {
  db.open(config.tibero, err => {
    if(err){
      console.log("TIBERO connect FAIL");
      return callback(err, null);
    }

    const query = "select * from Ichairport where "
                  +"scheduleDateTime = " + result.result + "%;";

    db.query(query, (err, rows, moreResultSets) => {
      if(err){
        console.log("IchairportFindAndCountAll error");
        console.log(err);
        db.close(()=>{});
        return callback({});
      }
      console.log(rows.length);
      const result = {
        "rows" : rows,
        "count" : rows.length
      };
      callback(result);
      db.close(()=>{});
    });
  });
};
