'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();
const scoreboardController = require('../controllers/scoreboard_controller');

router.get('/:station_id/:date',scoreboardController.getAllScoreboardDataByStationIdAndDate);
router.get('/:station_id',scoreboardController.getAllScoreboardDataByStationId);
router.post('/',scoreboardController.addScoreboardDataByStation);
router.put('/:id',scoreboardController.updateScoreboard);
router.delete('/:id',scoreboardController.deleteScoreboardById);


module.exports = router;