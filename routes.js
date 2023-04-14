const express = require('express');
const router = express.Router();
const schemasController = require('./controllers/schemasController');
const searchController = require('./controllers/searchController');

router.use('/schemas', schemasController);
router.use('/search', searchController);

module.exports = router;
