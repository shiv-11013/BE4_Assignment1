const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
const BookStructure = require("./db/models/newBooks.models");
const Book = require("./db/models/newBooks.models");

app.use(express.json());
initializeDatabase();

const newBook1 = {
  title: "Lean In",
  author: "Sheryl Sandberg",
  publishedYear: 2012,
  genre: ["Non-fiction", "Business"],
  language: "English",
  country: "United States",
  rating: 4.1,
  summary:
    "A book about empowering women in the workplace and achieving leadership roles.",
  coverImageUrl: "https://example.com/lean_in.jpg",
};

const newBook2 = {
  title: "Shoe Dog",
  author: "Phil Knight",
  publishedYear: 2016,
  genre: ["Autobiography", "Business"],
  language: "English",
  country: "United States",
  rating: 4.5,
  summary:
    "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
  coverImageUrl: "https://example.com/shoe_dog.jpg",
};

app.get("/", (req, res) => {
  res.send("Hello");
});

async function createNewBook(newBook1) {
  try {
    const book = new BookStructure(newBook1);
    const saveBook = await book.save();
    // console.log("New Book", saveBook);
    return saveBook;
  } catch (error) {
    throw error;
  }
}

// createNewBook(newBook1);
// createNewBook(newBook2);

app.post("/books", async (req, res) => {
  try {
    const saveBook = await createNewBook(req.body);
    res
      .status(201)
      .json({ message: "Book added Successfully.", book: saveBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Data", error });
  }
});

// 3. Create an API to get all the books in the database as response. Make sure to do error handling.
async function getAllBooks() {
  try {
    const books = await BookStructure.find({});
    // console.log(books);
    return books;
  } catch (error) {
    console.log("Error fetching hotels:", error);
  }
}

// getAllBooks();

app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No Books Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// 4. Create an API to get a book's detail by its title. Make sure to do error handling.

async function getBOOKSDETAILSbytitle(title) {
  try {
    const book = await BookStructure.find({ title: title });
    return book;
  } catch (error) {
    console.log("Error:");
  }
}

app.get("/books/:title", async (req, res) => {
  try {
    const bookbytitle = await getBOOKSDETAILSbytitle(req.params.title);
    if (bookbytitle != 0) {
      res.json(bookbytitle);
    } else {
      res.status(404).json({ error: " booksbytitle NOT FOUND" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookbytitle", error });
  }
});

// 5. Create an API to get details of all the books by an author. Make sure to do error handling.

async function getbookbyauthor(author) {
  try {
    const book = await BookStructure.find({ author: author });
    return book;
  } catch (error) {
    console.log("ERROR:");
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const bookbyauthor = await getbookbyauthor(req.params.authorName);
    if (bookbyauthor != 0) {
      res.json(bookbyauthor);
    } else {
      res.status(404).json({ error: "Not Found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Data:" });
  }
});

//6. Create an API to get all the books which are of "Business" genre.

async function getAllBooksByGenre(genre) {
  try {
    const book = await BookStructure.find({ genre: genre });
    return book;
  } catch (error) {
    console.log("Error:");
  }
}

app.get("/books/genre/:genreName", async (req, res) => {
  try {
    const bookbygenre = await getAllBooksByGenre(req.params.genreName);
    if (bookbygenre != 0) {
      res.json(bookbygenre);
    } else {
      res.status(404).json({ error: "Not Found Genre" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

//7. Create an API to get all the books which was released in the year 2012.

async function getAllBooksByReleaseYear(year) {
  try {
    const books = await BookStructure.find({ publishedYear: year });
    return books;
  } catch (error) {
    console.error("Error fetching books by release year:", error);
    throw error;
  }
}

app.get("/books/releaseYear/:year", async (req, res) => {
  try {
    const booksByYear = await getAllBooksByReleaseYear(req.params.year);
    if (booksByYear.length > 0) {
      res.json(booksByYear);
    } else {
      res
        .status(404)
        .json({ error: "No books found for the given release year." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch books by release year.", error });
  }
});

// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.

// Updated book rating: { "rating": 4.5 }

async function updateBooksRating(id, dataToUpdate) {
  try {
    const updatedBookRating = await BookStructure.findByIdAndUpdate(
      id,
      dataToUpdate,
      { new: true }
    );
    // console.log(updatedBookRating);
    return updatedBookRating;
  } catch (error) {
    console.log("Error in Updating Restaurant", error);
  }
}

app.post("/books/book/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBooksRating(req.params.bookId, req.body);
    if (updatedBook) {
      res
        .status(201)
        .json({ message: "Successfully Updated", Book: updatedBook });
    } else {
      res.status(404).json({ error: "Book Not Found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Updated" });
  }
});

//9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.

// Updated book data: { "publishedYear": 2017, "rating": 4.2 }

async function updateBookRatingAndPublishYear(id, dataToUpdate) {
  try {
    const updatedBookData = await BookStructure.findByIdAndUpdate(
      id,
      dataToUpdate,
      { new: true }
    );
    return updatedBookData;
  } catch (error) {
    throw error;
  }
}

app.post("/books/book/:bookId", async (req, res) => {
  try {
    const updatedbookData = await updateBookRatingAndPublishYear(
      req.params.bookId,
      req.body
    );
    if (updatedbookData != 0) {
      res
        .status(201)
        .json({ message: "Successfully Updated", Book: updatedbookData });
    } else {
      res.status(404).json({ error: "Book Not Found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the data" });
  }
});

// 10. Create an API to delete a book with the help of a book id,
// Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.

async function deleteBookById(bookId) {
  try {
    const deletedData = await BookStructure.findByIdAndDelete(bookId);
    return deletedData;
  } catch (error) {
    console.log("Error:");
  }
}

app.delete("/books/book/:bookId", async (req, res) => {
  try {
    const deletedData = await deleteBookById(req.params.bookId);
    if (deletedData) {
      res
        .status(201)
        .json({ message: "Successfully Deleted", hotel: deletedData });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Data" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
