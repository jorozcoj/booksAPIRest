import { BookModel } from "../model/books.js";



export class BookController {

    static async getAll(req,res) {
        const {name ,author} = req.query;
        const bookList = await BookModel.getAll({name, author})

        res.json(bookList)
    }

    static async getById(req,res){
        const {id}= req.params;
        const books = await BookModel.getById({id})
        if(books) return res.json(books);

        res.status(404).send("<h1>Movie not found</h1>")

    }

    static async create(req,res ) {
        const  {
            id,
            name,
            author,
            year,
            cover
        } =req.body;
        

        const newBook = await BookModel.create({})
        /* res.status(404).send("<h2>Movie couldn't be created</h2>") */

    }

    static async update (req,res){

    }

    static async delete (req,res){

    }
}