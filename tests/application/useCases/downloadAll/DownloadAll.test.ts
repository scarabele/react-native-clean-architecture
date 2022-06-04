import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import DownloadAll from '@/application/useCases/downloadAll/DownloadAll';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve baixar e salvar todos os dados da API', async () => {
  const downloadAll = new DownloadAll(repositoryFactory);
  const output = await downloadAll.execute();
  expect(output).toBeGreaterThan(1);
});
