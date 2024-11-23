import { Router } from "express";
import { BookController } from "../controller/books.js";

export const bookRouter = Router();

//get all books
bookRouter.get('/', BookController.getAll)

/* get only one book */
bookRouter.get('/:id',BookController.getById)

// create a new book
bookRouter.post('/',BookController.create)

//update a book 
bookRouter.patch('/:id', BookController.update)

//delete a book
bookRouter.delete('/:id', BookController.delete)
