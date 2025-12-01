// src/routes/weather.routes.js
const express = require('express');
const controller = require('../controllers/weather.controller');

const router = express.Router();

router.get('/', controller.getByCity);

module.exports = router;
