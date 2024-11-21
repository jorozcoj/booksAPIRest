import { Router } from "express";

export const bookRouter = Router();

//get all books
bookRouter.get('/', (req, res)=>{
    res.send(path.join('public','index.html')) 
})

/* get only one book */
bookRouter.get('/:id',(req, res)=>{
})

// create a new book
bookRouter.post('/',(req, res)=>{
})

//update a book 
bookRouter.patch('/:id', (req, res)=>{
})

//delete a book
bookRouter.delete('/:id', (req, res)=>{
})
