import Todo from '../entities/Todo';

export default interface TodoRepository {
  getAll(): Promise<Todo[]>;
  getByUserId(userId: number): Promise<Todo[]>;
  getRemoteAll(): Promise<Todo[]>;
  saveAll(todos: Todo[]): Promise<number>;
}
