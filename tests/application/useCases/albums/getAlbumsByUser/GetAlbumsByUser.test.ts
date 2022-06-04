import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetAlbumsByUser from '@/application/useCases/albums/getAlbumsByUser/GetAlbumsByUser';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todos os álbuns do usuário', async () => {
  const getAlbumsByUser = new GetAlbumsByUser(repositoryFactory);
  const input = {id: 1};
  const output = await getAlbumsByUser.execute(input);
  expect(output[0].userId).toBe(1);
});
