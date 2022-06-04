import axios from 'axios';
import UserRepositoryFake from '@/infra/repositories/fake/UserRepositoryFake';
import UserRepository from '@/domain/repositories/UserRepository';
import RepositoryException from '@/infra/exeptions/RepositoryException';
import AxiosClient from '@/infra/httpClient/AxiosClient';
import User from '@/domain/entities/User';

jest.mock('axios');
let userRepository: UserRepository;

beforeEach(async function () {
  (axios.create as jest.Mock).mockReturnThis();
  const axiosClient = new AxiosClient();
  userRepository = new UserRepositoryFake(axiosClient);
});

test('lista todos os usuários', async () => {
  const users = await userRepository.getAll();
  expect(users[0].id).toBe(1);
});

test('busca o usuário id 1', async () => {
  const user = await userRepository.findById(1);
  expect(user.id).toBe(1);
});

test('lança exeption para usuário não encontrado', async () => {
  await expect(userRepository.findById(1000)).rejects.toThrow(
    new RepositoryException('Usuário não encontrado'),
  );
});

test('lista todos os usuários da API', async () => {
  const fakeResp = {
    data: [
      {id: 1, name: 'John', email: 'john@test.com'},
      {id: 2, name: 'Andrew', email: 'andrew@test.com'},
    ],
  };
  (axios.get as jest.Mock).mockResolvedValue(fakeResp);
  const users = await userRepository.getRemoteAll();
  expect(users[0].id).toBe(1);
});

test('salvar todos os usuários', async () => {
  const user1 = new User({id: 1, name: 'John', email: 'john@test.com'});
  const user2 = new User({id: 2, name: 'Andrew', email: 'andrew@test.com'});
  const user3 = new User({
    id: 3,
    name: 'Clementine Bauch',
    email: 'Nathan@yesenia.net',
  });
  await userRepository.saveAll([user1, user2, user3]);
  const users = await userRepository.getAll();
  expect(users.length).toBe(3);
});
