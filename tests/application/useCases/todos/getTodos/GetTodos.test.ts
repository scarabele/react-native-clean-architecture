import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetTodos from '@/application/useCases/todos/getTodos/GetTodos';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todas as tarefas', async () => {
  const getTodos = new GetTodos(repositoryFactory);
  const output = await getTodos.execute();
  expect(output[0].id).toBe(1);
});
