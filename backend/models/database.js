var oracle = require('oracledb');
var db_config = require('./db-config.js');
  
var con = oracle.getConnection(db_config);

// con.ping((err) => {console.log(err)});
// con.connect((err) => {console.log(err)});

  // console.log(con);

// const sql = 'select * from Books WHERE ROWNUM < 10';
// const params = [];
// var res = await con.execute(sql);
// console.log(res);  
// console.log(con);


// run();

module.exports = con;
