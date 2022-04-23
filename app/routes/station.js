'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/station_controller');

router.get('/',stationController.getAllStations);
router.post('/',stationController.addStation);
router.put('/:id',stationController.updateStation);
router.delete('/:id',stationController.deleteStationById);


module.exports = router;