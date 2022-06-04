import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import SaveAlbums from '@/application/useCases/albums/saveAlbums/SaveAlbums';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve salvar todos os álbuns', async () => {
  const saveAlbums = new SaveAlbums(repositoryFactory);
  const input = [
    {id: 1, title: 'quidem molestiae enim', userId: 1},
    {id: 2, title: 'sunt qui excepturi placeat culpa', userId: 1},
    {id: 3, title: 'omnis laborum odio', userId: 1},
  ];
  const output = await saveAlbums.execute(input);
  expect(output).toBe(3);
});
