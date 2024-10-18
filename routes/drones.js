const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find();
    res.render('drones/list', { drones }); // Make sure your list.hbs file exists and is set up correctly.
  } catch (error) {
    console.log("Error while fetching drones:", error);
    next(error);
  }
  // ... your code here
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
  
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;
  try {
    await Drone.create({ name, propellers, maxSpeed });
    res.redirect('/drones');
  } catch (error) {
    console.log("Error while creating new drone:", error);
    res.render('drones/create-form');
  }
 
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const drone = await Drone.findById(req.params.id);
    res.render('drones/update-form', { drone }); // Ensure update-form.hbs pre-fills the form fields with the drone's data.
  } catch (error) {
    console.log("Error while fetching drone details for edit:", error);
    next(error);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;
  try {
    await Drone.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed });
    res.redirect('/drones');
  } catch (error) {
    console.log("Error while updating drone:", error);
    res.render('drones/update-form', { drone: req.body });
  }
});

router.post('/drones/:id/delete',async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect('/drones');
  } catch (error) {
    console.log("Error while deleting drone:", error);
    next(error);
  }
});

module.exports = router;
