import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import GetUsers from '@/application/useCases/users/getUsers/GetUsers';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve listar todos os usuários', async () => {
  const getUsers = new GetUsers(repositoryFactory);
  const users = await getUsers.execute();
  expect(users[0].id).toBe(1);
});
