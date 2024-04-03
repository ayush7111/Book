const Book = require("../models/bookModel");
const cloudinary = require("../config/cloudinary");
exports.getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm || "";

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query = {};
    if (searchTerm) {
      query.title = { $regex: new RegExp(searchTerm, "i") };
    }

    const results = {};
    results.totalCount = await Book.countDocuments(query);

    if (endIndex < results.totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.books = await Book.find(query).limit(limit).skip(startIndex);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "bookstore",
    });
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price,
      quantity: req.body.quantity,
      image: result.secure_url,
    });
    await newBook.save();
    res.status(201).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bookstore",
      });
      imageUrl = result.secure_url;
    }

    const { id } = req.params;
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedFields = {
      title: req.body.title || book.title,
      author: req.body.author || book.author,
      genre: req.body.genre || book.genre,
      price: req.body.price || book.price,
      quantity: req.body.quantity || book.quantity,
      image: imageUrl || book.image,
    };

    book = await Book.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
