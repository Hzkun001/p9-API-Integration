// src/routes/countries.routes.js
const express = require('express');
const controller = require('../controllers/countries.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/region/:region', controller.getByRegion);
router.get('/name/:name', controller.getByName);

module.exports = router;
