import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import SavePosts from '@/application/useCases/posts/savePosts/SavePosts';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve salvar todos os posts', async () => {
  const savePosts = new SavePosts(repositoryFactory);
  const input = [
    {
      id: 1,
      title: 'quidem molestiae enim',
      userId: 1,
      body: 'sunt qui excepturi placeat culpa',
    },
    {
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
      userId: 1,
      body: 'omnis laborum odio',
    },
    {id: 3, title: 'omnis laborum odio', userId: 1, body: 'non est facere'},
  ];
  const output = await savePosts.execute(input);
  expect(output).toBe(3);
});
