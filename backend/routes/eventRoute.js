const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");
const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getUserEvents,
} = require("../controllers/eventController.js");

router.get("/my", getUserEvents); // GET /api/events/my

router.post("/create", upload.single("banner"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);


module.exports = router;