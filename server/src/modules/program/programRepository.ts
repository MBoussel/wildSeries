import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async create(program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [program.title],
    );
    return result.insertId;
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );
    return rows[0] as Program;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }

  async update(program: Program) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET title = ?, synopsis = ?, poster = ?, country = ?, year = ? WHERE id = ?",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ProgramRepository();
