import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetTodoByUserOutput from './GetTodoByUserOutput';
import GetTodoByUserInput from './GetTodoByUserInput';

export default class GetTodosByUser {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: GetTodoByUserInput): Promise<GetTodoByUserOutput[]> {
    const todoRepository = this.repositoryFactory.createTodoRepository();
    const todos = await todoRepository.getByUserId(input.id);
    return todos.map(
      todo =>
        new GetTodoByUserOutput(
          todo.id,
          todo.title,
          todo.userId,
          todo.completed,
        ),
    );
  }
}
