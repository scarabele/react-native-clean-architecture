import Todo from '@/domain/entities/Todo';
import TodoRepository from '@/domain/repositories/TodoRepository';
import SqliteConnection from '@/infra/database/sqliteDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class TodoRepositorySqlite implements TodoRepository {
  constructor(readonly httpClient: HttpClient, readonly db: SqliteConnection) {}

  async findById(id: number): Promise<Todo> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from todos where id = ?',
        args: [id],
      });
      if (results.rows.length === 0) {
        throw new RepositoryInfraExeption('Tarefa não encontrada');
      }
      return new Todo({
        id: results.rows.raw()[0].id,
        title: results.rows.raw()[0].title,
        userId: results.rows.raw()[0].userId,
        completed: results.rows.raw()[0].completed,
      });
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<Todo[]> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from todos',
        args: [],
      });
      return results.rows.raw().map(
        result =>
          new Todo({
            id: result.id,
            title: result.title,
            userId: result.userId,
            completed: !!result.completed,
          }),
      );
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getByUserId(userId: number): Promise<Todo[]> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from todos where userId = ?',
        args: [userId],
      });
      return results.rows.raw().map(
        result =>
          new Todo({
            id: result.id,
            title: result.title,
            userId: result.userId,
            completed: !!result.completed,
          }),
      );
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getRemoteAll(): Promise<Todo[]> {
    const response = await this.httpClient.get('/todos');
    return response.data.map((todo: any) => new Todo(todo));
  }

  async saveAll(todos: Todo[]): Promise<number> {
    try {
      let counter = 0;
      const sql =
        'insert or replace into todos (id,title,userId,completed) values (?,?,?,?)';
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const results = await this.db.execute({
          sqlStatement: sql,
          args: [
            todo.id,
            todo.title,
            todo.userId,
            todo.completed === true ? 1 : 0,
          ],
        });
        counter += results.rowsAffected;
      }
      return counter;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
