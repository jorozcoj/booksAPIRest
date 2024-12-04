import { BookModel } from "../model/books.js";
import {
  validateBook,
  validatePartialBook,
} from "../../schemas/book-validator.js";

export class BookController {
  static async getAll(req, res) {
    const { name, author } = req.query; // extrae los filtros de la consulta
    const bookList = await BookModel.getAll({ name, author });

    res.json(bookList);
  }

  static async getById(req, res) {
    const { id } = req.params; // Extrae el Id de la URL
    const books = await BookModel.getById({ id });
    if (books) return res.json(books);

    res.status(404).send("<h1>Movie not found</h1>");
  }

  static async create(req, res) {
    const result = validateBook(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newBook = await BookModel.create({ input: result.data });
    /* res.status(404).send("<h2>Movie couldn't be created</h2>") */
    res.status(201).json(newBook);
  }

  static async update(req, res) {
    const result = validatePartialBook(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const bookUpdated = await BookModel.update({ id, input: result.data });
    return res.json(bookUpdated);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await BookModel.delete({ id });
    if (!result.success) {
        return res.status(404).json({ error: JSON.parse(result.error.message) })
    }
    return res.json({message:"Book deleted"})


    /* if (result === false) {
      return res.status(404).json({ message:"Book not found" });
    } */
   
  }
}
