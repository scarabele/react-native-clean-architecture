import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import SaveTodos from '@/application/useCases/todos/saveTodos/SaveTodos';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve salvar todas as tarefas', async () => {
  const saveTodos = new SaveTodos(repositoryFactory);
  const input = [
    {id: 1, title: 'delectus aut autem', userId: 1, completed: false},
    {id: 2, title: 'task 2', userId: 1, completed: false},
    {id: 3, title: 'task 3', userId: 1, completed: true},
  ];
  const output = await saveTodos.execute(input);
  expect(output).toBe(3);
});
