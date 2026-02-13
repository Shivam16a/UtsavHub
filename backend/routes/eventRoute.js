const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");
const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  shareEvent,
} = require("../controllers/eventController.js");

router.post("/create", upload.single("banner"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.put("/share/:id", shareEvent);

module.exports = router;