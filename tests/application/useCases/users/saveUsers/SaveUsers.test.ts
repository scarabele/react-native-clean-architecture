import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import SaveUsers from '@/application/useCases/users/saveUsers/SaveUsers';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve salvar todos os usuários', async () => {
  const saveUsers = new SaveUsers(repositoryFactory);
  const input = [
    {id: 1, name: 'John', email: 'john@test.com'},
    {id: 2, name: 'Andrew', email: 'andrew@test.com'},
    {id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net'},
  ];
  const output = await saveUsers.execute(input);
  expect(output).toBe(3);
});
