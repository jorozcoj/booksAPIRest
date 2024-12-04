import { z } from "zod";

const bookSchema =z.object({
    name:z.string({
        invalid_type_error:'Book name must be a string',
        required_error:'Book name is required'
    }),
    author:z.string({
        invalid_type_error:'Book author must be a string',
        required_error:'Book author is required'
    }),
    year:z.number().int().max(2024),
    cover:z.string().url({
        message:'Poster must be a valid URL'
    })
})

export function validateBook(object){
    return bookSchema.safeParse(object)
}

export function validatePartialBook(input){
    return bookSchema.partial().safeParse(input)
}