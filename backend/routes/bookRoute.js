const express = require("express");
const router = express.Router();
const upload = require('../config/multer');
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBookById);

router.post("/", upload.single("image"), bookController.createBook);

router.put("/:id", upload.single("image"), bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

module.exports = router;
