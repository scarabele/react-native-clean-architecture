import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetTodosByUser from '@/application/useCases/todos/getTodosByUser/GetTodosByUser';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todas as tarefas do usuário', async () => {
  const getTodosByUser = new GetTodosByUser(repositoryFactory);
  const input = {id: 1};
  const output = await getTodosByUser.execute(input);
  expect(output[0].userId).toBe(1);
});
