import connection from '../../config/dbclient.js'
import {crypto} from "node:crypto"

export class BookModel {

    static async getAll({name, author}){
        if(name){
            const lowerCaseName = name.toLowerCase();
            const [filtered] = await connection.query(
                "select BIN_TO_UUID(id), name, author, year, cover from book where lower(name) like ? ",[lowerCaseName]
            )
            return filtered
        }else if(author){
            const lowerCaseAuthor = author.toLowerCase();
            const [filtered] = await connection.query(
                "select BIN_TO_UUID(id), name, author, year, cover from book where lower(author) like ? ",[lowerCaseAuthor]
            )
            return filtered

        }const [books] = await connection.query(
            "select BIN_TO_UUID(id), name, author, year, cover from book"
        )
        return books
        
    }

    static async getById({id}){
        const [books] = await connection.query(
            "select BIN_TO_UUID(id), name, author, year, cover from book where BIN_TO_UUID(id)=?",
            [id]
        )
        return books
    }

    static async create({data}){
        const newBook ={
           id:randomUUID,
           name:name
        } 
    }

}