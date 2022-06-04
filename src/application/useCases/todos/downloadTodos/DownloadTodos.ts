import Todo from '@/domain/entities/Todo';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';

export default class DownloadTodos {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<number> {
    const todoRepository = this.repositoryFactory.createTodoRepository();
    const remoteTodos = await todoRepository.getRemoteAll();
    const todos = remoteTodos.map(
      todo =>
        new Todo({
          id: todo.id,
          title: todo.title,
          userId: todo.userId,
          completed: todo.completed,
        }),
    );
    const output = await todoRepository.saveAll(todos);
    return output;
  }
}
