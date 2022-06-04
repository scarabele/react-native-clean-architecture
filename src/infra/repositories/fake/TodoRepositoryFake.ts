import Todo from '@/domain/entities/Todo';
import TodoRepository from '@/domain/repositories/TodoRepository';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class TodoRepositoryFake implements TodoRepository {
  todos: Todo[];

  constructor(readonly httpClient: HttpClient) {
    const todo1 = new Todo({
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
      completed: false,
    });
    const todo2 = new Todo({
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      userId: 1,
      completed: true,
    });
    this.todos = [todo1, todo2];
  }

  async getAll(): Promise<Todo[]> {
    return this.todos;
  }

  async getByUserId(userId: number): Promise<Todo[]> {
    return this.todos.filter(todo => todo.userId === userId);
  }

  async getRemoteAll(): Promise<Todo[]> {
    const response = await this.httpClient.get('/todos');
    return response.data.map((todo: any) => new Todo(todo));
  }

  async saveAll(todos: Todo[]): Promise<number> {
    this.todos = todos;
    return this.todos.length;
  }
}
