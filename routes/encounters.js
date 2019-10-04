const express = require('express');
const encountersController = require('../controllers/encountersController');

const router = express.Router();


router
  .route('/')
  .post(encountersController.save)
  .get(encountersController.index);


router
  .route('/:objectId')
  .get(encountersController.getOne)
  .put(encountersController.update)
  .delete(encountersController.deleteOne);

router
  .route('/:objectId/roll')
  .get(encountersController.roll);

module.exports = router;
