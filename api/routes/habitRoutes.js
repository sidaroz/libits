const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habits");
const { verifyToken } = require("../middleware/verifytoken");

router.post("/", habitController.createHabit);
router.get("/:email", verifyToken, habitController.filterHabitsByEmail);
router.delete("/entry/:id", habitController.deleteHabit);
router.get("/entry/:id", habitController.findHabitById);
router.patch("/entry/:id", habitController.increaseRepCounter);

module.exports = router;
