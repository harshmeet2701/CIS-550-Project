const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const connection = require('../models/database');

router.get('/', (req, res) => getBooks(req,res));
router.get('/search/title/:title', (req, res) => getBookForTitle(req,res));
// router.get('/search/isbn/:isbn', (req, res) => getBookForIsbn(req,res));
// router.get('/search/author/:author', (req, res) => getBookForAuthor(req,res));
// router.get('/recommended/topRated', (req, res) => getTopRatedBooks(req,res));
// router.get('/recommended/ages', (req, res) => getAges(req,res));
// router.get('/recommended/ages/:age', (req, res) => getForAge(req,res));
// router.get('/bestseller/publishing', (req, res) => getTopNYPublishing(req,res));
// router.get('/bestseller/authors', (req, res) => getTopNYAuthors(req,res));
// router.get('/bestseller/rank', (req, res) => getTopNYRank(req,res));
// router.get('/bestseller/new', (req, res) => getNewNY(req,res));
// router.get('/movies/:bestseller', (req, res) => getMoviesThatBestSeller(req,res));
// router.get('/categories/:categoryName', (req, res) => getTopCategories(req,res));
// router.get('/categories/nyauthor/:categoryName', (req, res) => getTopCategoryAuthorNY(req,res));
// router.get('/categories/topRated/:categoryName', (req, res) => getTopCategoryPublisher(req,res));
// router.get('/categories/publisher/:categoryName', (req, res) => getTopCategoryRated(req,res));
// router.get('/movies', (req, res) => getMovies(req,res));


function getBooks(req,res) {
  console.log('READ all users');

  connection.then((con) => {
    const sql = 'select * from Books WHERE ROWNUM < 10';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


function getBookForTitle(req,res) {

  connection.then((con) => {
    const sql = 'select * from Books WHERE ROWNUM < 10';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getBookForIsbn(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getBookForAuthor(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getTopRatedBooks(req,res) {

  connection.then((con) => {
    // console.log(con);
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getAges(req,res) {

  connection.then((con) => {
    // console.log(con);
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getForAge(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getTopNYPublishing(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getTopNYAuthors(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


function getTopNYRank(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


function getNewNY(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


function getMoviesThatBestSeller(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getTopCategories(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}

function getTopCategoryAuthorNY(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}



function getTopCategoryRated(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


function getTopCategoryPublisher(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}


function getMovies(req,res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });  
}



module.exports = router;
