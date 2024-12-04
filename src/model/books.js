import connection from "../../config/dbclient.js";
//import {crypto} from "node:crypto"

export class BookModel {
  static async getAll({ name, author }) {
    if (name) {
      const lowerCaseName = name.toLowerCase();
      const [filtered] = await connection.query(
        "select BIN_TO_UUID(id), name, author, year, cover from book where lower(name) like ? ",
        [lowerCaseName]
      );
      return filtered;
    } else if (author) {
      const lowerCaseAuthor = author.toLowerCase();
      const [filtered] = await connection.query(
        "select BIN_TO_UUID(id), name, author, year, cover from book where lower(author) like ? ",
        [lowerCaseAuthor]
      );
      return filtered;
    }
    const [books] = await connection.query(
      "select BIN_TO_UUID(id), name, author, year, cover from book"
    );
    return books;
  }

  static async getById({ id }) {
    const [books] = await connection.query(
      "select BIN_TO_UUID(id) id, name, author, year, cover from book where BIN_TO_UUID(id)=?",
      [id]
    );
    return books;
  }

  static async create({ input }) {
    const { name, author, year, cover } = input;

    const [uuidResult] = await connection.query("select UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        "insert into book (id, name, author, year, cover) values (UUID_TO_BIN(?), ? , ? , ?, ?)",
        [uuid, name, author, year, cover]
      );
    } catch (error) {
      console.log("error creating book", error);
      throw new Error("Error creating book");
    }
    const [books] = await connection.query(
      "select name, author, year, cover from book where id= UUID_TO_BIN(?)",
      [uuid]
    );
    return books[0];
  }

  static async update({ id, input }) {
    if (!id) {
      throw new Error("insert a correct id");
    }

    const [books] = await connection.query(
      "select * from book where id = UUID_TO_BIN(?)",
      [id]
    );
    if (books.length === 0) {
      throw new Error("Book not found");
    }

    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${key}= ?`);
      values.push(value);
    }
    //add ID for condition Where
    values.push(id);
    try {
      // update the book
      await connection.query(
        `UPDATE book SET ${fields.join(", ")} WHERE id = UUID_TO_BIN(?);`,
        values
      );

      // Return the book updated
      const [bookUpdated] = await connection.query(
        `SELECT name, author, year, cover FROM book WHERE id = UUID_TO_BIN(?)`,
        [id]
      );

      return bookUpdated[0];
    } catch (error) {
      console.log("The book couldn't be updated", error);
      throw new Error("The book couldn't be updated");
    }
  }

  static async delete({ id }) {
    const [books] = await connection.query(
        "DELETE from book where BIN_TO_UUID(id)=?",
        [id]
      );
    /* Const [uuidResult] = await connection.query("select UUID() uuid;");
    const [{ uuid }] = uuidResult;
    if (!id) {
      throw new Error("Insert a correct Id");
    }
    try {
      await connection.query(
        `DELETE FROM book where id =?;`,
        [uuid],       
      );
    } catch (error) {
      console.log("The book couldn't be deleted", error);
      throw new Error("The book couldn't be deleted");
    }*/
  } 
}
