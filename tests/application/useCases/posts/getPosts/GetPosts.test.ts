import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetPosts from '@/application/useCases/posts/getPosts/GetPosts';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todos os posts', async () => {
  const getPosts = new GetPosts(repositoryFactory);
  const output = await getPosts.execute();
  expect(output[0].id).toBe(1);
});
