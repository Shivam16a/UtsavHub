const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");
const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getUserEvents,
  deleteEvent,
} = require("../controllers/eventController.js");

router.get("/my", getUserEvents); // GET /api/events/my

router.post("/create", upload.single("banner"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.delete("/delete/:id", deleteEvent);



module.exports = router;