const express = require('express');
const locationsController = require('../controllers/locationsController');

const router = express.Router();

router
  .route('/')
  .get(locationsController.index)
  .post(locationsController.save);

router
  .route('/:objectId')
  .get(locationsController.getOne)
  .put(locationsController.update)
  .delete(locationsController.deleteOne);

module.exports = router;
