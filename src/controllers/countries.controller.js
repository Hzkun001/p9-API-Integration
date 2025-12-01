// src/controllers/countries.controller.js
const service = require('../services/countries.service');

async function getAll(req, res, next) {
  try {
    const data = await service.fetchAllCountries();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getByRegion(req, res, next) {
  try {
    const { region } = req.params;
    if (!region) {
      return res.status(400).json({ message: 'Region is required' });
    }

    const data = await service.fetchByRegion(region);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getByName(req, res, next) {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const data = await service.fetchByName(name);
    res.json(data);
  } catch (err) {
    // Kustomisasi 404 kalau negara tidak ditemukan dari API eksternal
    if (err.response && err.response.status === 404) {
      return res
        .status(404)
        .json({ message: `Country '${req.params.name}' not found` });
    }

    // selain itu lempar ke global error handler
    next(err);
  }
}

module.exports = { getAll, getByRegion, getByName };
