var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  const newUser = req.body;

  res.send(newUser);
});

module.exports = router;
