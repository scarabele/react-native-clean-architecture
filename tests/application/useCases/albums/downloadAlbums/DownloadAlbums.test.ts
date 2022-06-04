import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import DownloadAlbums from '@/application/useCases/albums/downloadAlbums/DownloadAlbums';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve baixar e salvar todos os álbuns', async () => {
  const downloadAlbums = new DownloadAlbums(repositoryFactory);
  const output = await downloadAlbums.execute();
  expect(output).toBeGreaterThan(1);
});
