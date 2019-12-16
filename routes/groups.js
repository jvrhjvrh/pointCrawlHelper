const express = require('express');
const groupsController = require('../controllers/groupsController');

const router = express.Router();


router
  .route('/')
  .post(groupsController.save)
  .get(groupsController.index);


router
  .route('/:objectId')
  .get(groupsController.getOne)
  .put(groupsController.update)
  .delete(groupsController.deleteOne);

module.exports = router;
