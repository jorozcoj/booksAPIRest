import express, { json } from 'express';
import { config } from 'dotenv';
import { bookRouter } from './src/routes/books.js';

//integración de las variables de entorno con dotenv
config()

const app = express();
const PORT = process.env.port ?? 1234

app.disable('x-powered-by')
app.use(json());

app.use('/books', bookRouter)

//puerto en el que vá a escuchar el servidor
app.listen(PORT, ()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
})

//Para todas las rutas que no estén especificadas
app.use('/',(req, res)=>{
    res.status(404).send("<h1>Page not Found 404</h1>")
})