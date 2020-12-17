const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");

// base url: /api/book

/**
 * @route   GET /api/book
 * @desc    Books Listing endpoint
 * @access  Public
 */
router.get("/", BookController.getBookList);

/**
 * @route   GET /api/book/details/:id
 * @desc    Books Details endpoint
 * @access  Public
 */
router.get("/details/:id", BookController.getBookDetails);

module.exports = router;