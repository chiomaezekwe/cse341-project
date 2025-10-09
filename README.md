# cse341-project
CSE341 - BYU-Idaho my api project

# Library API

A RESTful API for managing a collection of books.

---

## Base URL

http://localhost:8080/api/books


---

## API Endpoints

### GET /api/books

- **Description:** Retrieve all books from the library.
- **Response Example (200 OK):**
```json
[
  {
    "_id": "652ff0f8a512c7c2df6a8be0",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "publishedYear": 1937,
    "ISBN": "978-0-345-33968-3",
    "language": "English",
    "summary": "A fantasy novel about Bilbo Baggins' adventure."
  }
]
POST /api/books
Description: Add a new book to the library.

Request Body (JSON):


{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "publishedYear": 1937,
  "ISBN": "978-0-345-33968-3",
  "language": "English",
  "summary": "A fantasy novel about Bilbo Baggins' adventure."
}
Validation:

All fields are required

publishedYear must be a number

Success Response (201 Created):

{
  "_id": "generatedIdHere",
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "publishedYear": 1937,
  "ISBN": "978-0-345-33968-3",
  "language": "English",
  "summary": "A fantasy novel about Bilbo Baggins' adventure."
}
Error Response (400):

{
  "error": "All fields are required and publishedYear must be a number."
}
 PUT /api/books/:id
Description: Update an existing book by its ID.

Request Body:

{
  "title": "The Hobbit: Revised Edition",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "publishedYear": 1938,
  "ISBN": "978-0-345-33968-3",
  "language": "English",
  "summary": "An updated edition of Bilbo Baggins' adventure."
}
Response (200 OK):

{
  "message": "Book updated successfully",
  "updatedBook": {
    "_id": "652ff0f8a512c7c2df6a8be0",
    "title": "The Hobbit: Revised Edition",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "publishedYear": 1938,
    "ISBN": "978-0-345-33968-3",
    "language": "English",
    "summary": "An updated edition of Bilbo Baggins' adventure."
  }
}
Error Response (404):

{
  "error": "Book not found"
}
 DELETE /api/books/:id
Description: Delete a book by its ID.

Success Response (200 OK):

{
  "message": "Book deleted successfully"
}
Error Response (404):

{
  "error": "Book not found"
}
 Error Handling Summary
Status	Meaning
400	Validation failed / Bad request
404	Book not found
500	Internal server error (e.g., DB crash)

Required Fields (Validation)
Field	Type	Required
title	String	 Yes
author	String	 Yes
genre	String	 Yes
publishedYear	Number	 Yes
ISBN	String	 Yes
language	String	 Yes
summary	String	 Yes