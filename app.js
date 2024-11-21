import express, { json } from 'express';
import { config } from 'dotenv';
import { bookRouter } from './src/routes/books';

config()
const app = express();
const PORT = process.env.port ?? 1234

app.disable('X-Powered-By')
app.use(json());

app.use('/books', bookRouter)


app.listen(PORT, ()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
})

app.use('/',(req, res)=>{
    res.status(404).send("<h1>Page not Found 404</h1>")
})