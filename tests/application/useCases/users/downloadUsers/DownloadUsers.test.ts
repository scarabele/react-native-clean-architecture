import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import DownloadUsers from '@/application/useCases/users/downloadUsers/DownloadUsers';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve baixar e salvar todos os usuários', async () => {
  const downloadUsers = new DownloadUsers(repositoryFactory);
  const output = await downloadUsers.execute();
  expect(output).toBeGreaterThan(1);
});
