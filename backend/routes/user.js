const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../models/database');
const oracledb = require('oracledb');

// router.get('/', (req, res) => getBooks(req,res));

router.post('/register', (req, res) => addUser(req, res));
router.post('/login', (req, res) => loginUser(req, res));
router.post('/changePassword', (req, res) => changePassword(req, res));
router.post('/loginThirdParty', (req, res) => loginThirdParty(req, res));
router.post('/likeBook/:isbn', (req, res) => likeBook(req, res));
router.post('/readBook/:isbn', (req, res) => readBook(req, res));
router.post('/rateBook/:isbn', (req, res) => rateBook(req, res));
// router.get('/recommended/nyauthor', (req, res) => getNYAuthorsForYou(req,res));
// router.get('/recommended/categories', (req, res) => getBooksOnCategories(req,res));
// router.get('/recommended/author', (req, res) => getAuthorsForYou(req,res));


// function addUser(req, res) {

//   console.log(req);
//   connection.then((con) => {
    
//     bcrypt.hash(req.body.password, 10).then( hash => {
//       const email = req.email;
//       const password = req.password;
//       const firstName = req.firstName;
//       const lastName = req.lastName;

//       const sql = `INSERT INTO Member VALUES (email: ${email}, password: ${password}, firstName: ${firstName}, lastName: ${lastName})`;

//       con.execute(sql).then((response) => {
//         console.log(response);
//       }, err => {
//         console.log(err);
//       })
//       });

//   })
// }

function addUser(req, res) {
  console.log("Signing Up New User");
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then( hash => {
    connection.then((con) => {
    
      const password = hash;  
      const email = req.body.email;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;

      const newUser = {email, firstName, lastName }

      const sql = `INSERT INTO Member (email, password, first_name, last_name) VALUES ('${email}', '${password}', '${firstName}', '${lastName}')`;
      console.log(sql);
      // con.execute(sql, {autoCommit: true}).then((response) => {
      //   console.log('Respones:', response);
      // }, err => {
      //   console.log('Query:', err);
      // });

      con.execute(sql, {}, {autoCommit: true}, function (err, rows) {

        if(err){
          // Duplicated entry
          if(err.message.includes('unique constraint')){
            res.status(400).json({message:'duplicate'});
            return;
          }
          
          //Other Error
          res.status(400).json({message: err.message});
          return;
        } else {
        
          
        if(rows.rowsAffected === 1){
          res.status(201).json({
            message: 'success',
            user: newUser
          })
        }else {
          res.status(500).json({message: "Not able to insert entry in database"});
        }
        console.log(rows);
      }
      });

    }, err => {
      console.log(err);
      res.status(504).json({message: err.message});
    });

  }, err => {
    console.log(err);
    res.status(500).json({message: err.message});
  });
}

function loginUser(req, res) {
  connection.then((con) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `select * from Member where email = '${email}'`;

    con.execute(sql,{} ,{
      outFormat: oracledb.OUT_FORMAT_OBJECT   // query result format
    }, function(err, response) {
      const result = response.rows;      

      if(result.length === 0){
        return res.status(401).json({
          message: 'No User Found!'
        });
      }

      const pass = result[0]['PASSWORD'];
      const email = result[0]['EMAIL'];

      // console.log(result[0]);
      console.log(pass);
      bcrypt.compare(password, pass, function(err, resp){
        if(err) {
          console.log(err);
          return res.status(401).json({ message: 'Authentication Failed' });
        }

        if(resp) {
            // Success
          // console.log(result);
          return res.status(200).json({
            email: email,
            message:'success'
          });

        }else {
          // Failed
          console.log('Failed');
          return res.status(401).json({
            message: 'Authentication Failed'
          });
        }

      });
    });
  }, err => {
    console.log(err);
    res.status(504).json({message: err.message});
  });
}

function changePassword(req, res) {
  console.log('changing Password');
  bcrypt.hash(req.body.password, 10).then( hash => {
    connection.then((con) => {
      const password = hash;  
      const email = req.body.email;

      const sql = `UPDATE Member SET password='${password}' WHERE email='${email}'`;

      con.execute(sql, {}, {autoCommit: true}, function (err, rows) {

        if(err){
          console.log(err);
          res.status(400).json({message: err.message});
          return;
        } else {
          console.log(rows);
          
          if(rows.rowsAffected === 1){
            res.status(201).json({
              message: 'success',
              email: email
            })
          }else {
            res.status(500).json({message: "Not able to update entry in database"});
          }

        }        
      });
    }, err => {
      console.log(err);
      res.status(504).json({message: err.message});
    });
  }, err => {
    console.log(err);
    res.status(500).json({message: err.message});
  });
}

function loginThirdParty(req, res) {

  connection.then((con) => {
    const email = req.body.email;
    const sql = `select * from Member where email = '${email}'`;

    con.execute(sql).then((response)=> {
      console.log(response);
      const result = response.rows;
      if(result.length === 1) {
        return res.status(200).json({
          email: email,
          message:'success'
        })
      }else {

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;

        const insertSql = `INSERT INTO Member (email, password, first_name, last_name) VALUES ('${email}', '${password}', '${firstName}', '${lastName}')`;

        console.log(insertSql);
        con.execute(insertSql, {}, {autoCommit: true}, function (err, rows) {
          if (err){
            // Duplicated entry
            if(err.message.includes('unique constraint')){
              res.status(400).json({message:'duplicate'});
              return;
            }
            
            //Other Error
            res.status(400).json({message: err.message});
            return;
          }else {
            if(rows.rowsAffected === 1){
              res.status(201).json({
                message: 'success',
                email: email
              })
            }else {
              res.status(500).json({message: "Not able to insert entry in database"});
            }
            console.log(rows);
          }
        });
        
      }
    }, (err) => {
      console.log(err);
      res.status(500).json({message: err.message});
    });
  });
}

function likeBook(req, res) {
  connection.then((con) => {
    const email = req.body.email;
    const isbn = req.params.isbn;
    const identifier = req.body.id;
    console.log(identifier);

    const sql = `UPDATE MemberChoices SET likeFlag='${identifier}' WHERE email='${email}' and isbn='${isbn}'`;

    // con.execute(sql).then((response)=> {
    //   const result = response.rows;
    //   if(result.length === 1) {
        
    //   } else {

    //     const firstName = req.body.firstName;
    //     const lastName = req.body.lastName;
    //     const password = req.body.password;

    //     const insertSql = `INSERT INTO Member (email, password, first_name, last_name) VALUES ('${email}', '${password}', '${firstName}', '${lastName}')`;
    //   }
    // });


    con.execute(sql, {}, {autoCommit: true}, function (err, rows) { 
      if(err){
        console.log(err);
        res.status(400).json({message: err.message});
        return;
      } else {
        console.log(rows);
        
        if(rows.rowsAffected === 0){
          // Insert Entry
          const insertSql = `INSERT INTO MemberChoices (email, isbn, likeFlag) VALUES ('${email}', '${isbn}', '${identifier}')`;

          con.execute(insertSql, {}, {autoCommit: true}, function (err, rows) {
            if(err) {
              console.log(err);
              res.status(400).json({message: err.message});
              return;
            } else {
              if(rows.rowsAffected === 1){
                res.status(201).json({
                  message: 'success',
                  email: email
                })
              }else {
                res.status(500).json({message: "Not able to insert entry in database"});
              }
              console.log(rows);
            }
          });

        } else {
          res.status(201).json({
            message: 'success',
            email: email
          })
        }
      } 
    });
  });
}

function readBook(req, res) {
  connection.then((con) => {
    const email = req.body.email;
    const isbn = req.params.isbn;
    const identifier = req.body.id;

    const sql = `UPDATE MemberChoices SET readFlag='${identifier}' WHERE email='${email}' and isbn='${isbn}'`;

    con.execute(sql, {}, {autoCommit: true}, function (err, rows) { 
      if(err){
        console.log(err);
        res.status(400).json({message: err.message});
        return;
      } else {
        console.log(rows);
        
        if(rows.rowsAffected === 0){
          // Insert Entry
          const insertSql = `INSERT INTO MemberChoices (email, isbn, readFlag) VALUES ('${email}', '${isbn}', '${identifier}')`;

          con.execute(insertSql, {}, {autoCommit: true}, function (err, rows) {
            if(err) {
              console.log(err);
              res.status(400).json({message: err.message});
              return;
            } else {
              if(rows.rowsAffected === 1){
                res.status(201).json({
                  message: 'success',
                  email: email
                })
              }else {
                res.status(500).json({message: "Not able to insert entry in database"});
              }
              console.log(rows);
            }
          });

        } else {
          res.status(201).json({
            message: 'success',
            email: email
          })
        }
      } 
     });

  });
}

function rateBook(req, res) {
  connection.then((con) => {
    const email = req.body.email;
    const isbn = req.params.isbn;
    const rating = req.body.rating ? req.body.rating  : 0;

    const sql = `UPDATE MemberChoices SET rating='${rating}' WHERE email='${email}' and isbn='${isbn}'`;

    con.execute(sql, {}, {autoCommit: true}, function (err, rows) { 
      if(err){
        console.log(err);
        res.status(400).json({message: err.message});
        return;
      } else {
        console.log(rows);
        
        if(rows.rowsAffected === 0){
          // Insert Entry
          const insertSql = `INSERT INTO MemberChoices (email, isbn, rating) VALUES ('${email}', '${isbn}', ${rating})`;

          con.execute(insertSql, {}, {autoCommit: true}, function (err, rows) {
            if(err) {
              console.log(err);
              res.status(400).json({message: err.message});
              return;
            } else {
              if(rows.rowsAffected === 1){
                res.status(201).json({
                  message: 'success',
                  email: email
                })
              }else {
                res.status(500).json({message: "Not able to insert entry in database"});
              }
              console.log(rows);
            }
          });

        } else {
          res.status(201).json({
            message: 'success',
            email: email
          })
        }
      } 

    });
  });
}

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