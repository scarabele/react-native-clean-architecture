import Todo from '@/domain/entities/Todo';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import SaveTodoInput from './SaveTodoInput';

export default class SaveTodos {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: SaveTodoInput[]): Promise<number> {
    const todoRepository = this.repositoryFactory.createTodoRepository();
    const todos = input.map(
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
