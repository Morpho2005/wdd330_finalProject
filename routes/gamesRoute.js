// Needed Resources 
const express = require("express");
const router = new express.Router();
const gameController = require("../controllers/gameController");

// Route to build games by list view
router.get("/", gameController.buildGameList)
// Route to build individual game view
router.get("/id/:gameId", gameController.buildByGameId);
// Route to handle game filtering
router.get("/filter/", gameController.filterGameList);

// Export the router
module.exports = router;