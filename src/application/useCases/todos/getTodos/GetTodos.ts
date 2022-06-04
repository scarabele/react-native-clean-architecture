import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetTodoOutput from './GetTodoOutput';

export default class GetTodos {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<GetTodoOutput[]> {
    const todoRepository = this.repositoryFactory.createTodoRepository();
    const todos = await todoRepository.getAll();
    return todos.map(
      todo =>
        new GetTodoOutput(todo.id, todo.title, todo.userId, todo.completed),
    );
  }
}
