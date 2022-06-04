import Todo from '@/domain/entities/Todo';
import TodoRepository from '@/domain/repositories/TodoRepository';
import RealmConnection from '@/infra/database/realmDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class TodoRepositoryRealm implements TodoRepository {
  constructor(readonly httpClient: HttpClient, readonly db: RealmConnection) {}

  async findById(id: number): Promise<Todo> {
    try {
      const results = await this.db.query('Todo', `id == ${id}`);
      if (results.length === 0) {
        throw new RepositoryInfraExeption('Tarefa não encontrada');
      }
      return new Todo({
        id: results[0].id,
        title: results[0].title,
        userId: results[0].userId,
        completed: results[0].completed,
      });
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<Todo[]> {
    try {
      const results = await this.db.query('Todo', '');
      return results.map(
        result =>
          new Todo({
            id: result.id,
            title: result.title,
            userId: result.userId,
            completed: result.completed,
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
      const results = await this.db.query('Todo', `userId == ${userId}`);
      return results.map(
        result =>
          new Todo({
            id: result.id,
            title: result.title,
            userId: result.userId,
            completed: result.completed,
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
      const mapper = todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        userId: todo.userId,
        completed: todo.completed,
      }));
      await this.db.createAll('Todo', mapper);
      return todos.length;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
