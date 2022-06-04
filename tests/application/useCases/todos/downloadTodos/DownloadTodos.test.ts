import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import DownloadTodos from '@/application/useCases/todos/downloadTodos/DownloadTodos';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve baixar e salvar todas as tarefas', async () => {
  const downloadTodos = new DownloadTodos(repositoryFactory);
  const output = await downloadTodos.execute();
  expect(output).toBeGreaterThan(1);
});
