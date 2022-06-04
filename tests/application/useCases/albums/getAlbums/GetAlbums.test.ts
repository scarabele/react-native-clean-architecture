import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetAlbums from '@/application/useCases/albums/getAlbums/GetAlbums';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todos os álbuns', async () => {
  const getAlbums = new GetAlbums(repositoryFactory);
  const output = await getAlbums.execute();
  expect(output[0].id).toBe(1);
});
