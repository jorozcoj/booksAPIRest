import mysql from "mysql2/promise";
import { config } from "dotenv";
config()

//uso de las variables de entorno
const dbclient ={
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DBPORT
}

const connection = await mysql.createConnection(dbclient);

export default connection