const path = require('path');
const express = require('express');
const station = require(path.resolve('./app/routes/station'));
const router = express.Router(); 

router.get('/', function(req, res, next) {
  res.json({'message':'Floor Production APIs'});
});

router.use('/station', station);

module.exports = router;
