const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const connection = require('../models/database');

// router.get('/', (req, res) => getBooks(req,res));

router.get('/recommended/nyauthor', (req, res) => getNYAuthorsForYou(req,res));
router.get('/recommended/categories', (req, res) => getBooksOnCategories(req,res));
router.get('/recommended/author', (req, res) => getAuthorsForYou(req,res));

function getNYAuthorsForYou(req,res) {

    connection.then((con) => {
      const sql = 'FILL';
      con.execute(sql).then((response) => {
        console.log(response);
        res.json(response);
      })
    });  
  }
  
  
  function getBooksOnCategories(req,res) {
  
    connection.then((con) => {
      const sql = 'FILL';
      con.execute(sql).then((response) => {
        console.log(response);
        res.json(response);
      })
    });  
  }
  
  function getAuthorsForYou(req,res) {
  
    connection.then((con) => {
      const sql = 'FILL';
      con.execute(sql).then((response) => {
        console.log(response);
        res.json(response);
      })
    });  
  }

  
module.exports = router;