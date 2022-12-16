const express = require('express');
const tourController = require('./../controllers/tourController')

// Routes
const router = express.Router();
router.param('id',tourController.checkID)

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.c, tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;