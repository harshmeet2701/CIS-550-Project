const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const connection = require('../models/database');

router.get('/', (req, res) => getBooks(req,res));



function getBooks(req,res) {
  console.log('READ all users');

  connection.then((con) => {
    // console.log(con);
    const sql = 'select * from Books WHERE ROWNUM < 10';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


module.exports = router;
