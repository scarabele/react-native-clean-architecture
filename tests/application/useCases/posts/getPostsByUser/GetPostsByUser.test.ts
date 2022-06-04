import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetPostsByUser from '@/application/useCases/posts/getPostsByUser/GetPostsByUser';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todas as postagens do usuário', async () => {
  const getPostsByUser = new GetPostsByUser(repositoryFactory);
  const input = {id: 1};
  const output = await getPostsByUser.execute(input);
  expect(output[0].userId).toBe(1);
});
