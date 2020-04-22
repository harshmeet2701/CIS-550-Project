const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require("./routes/book");
const webapp = express();

// parse application/x-www-form-urlencoded
webapp.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
webapp.use(bodyParser.json());

webapp.use((req, res, next) => {
  // console.log('midle:'+JSON.stringify(req.body));
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  // console.log('after:'+JSON.stringify(req.body));
  next();
});

webapp.use("/book", bookRoutes);
// webapp.use('/api/post',postRoutes);

module.exports = webapp;