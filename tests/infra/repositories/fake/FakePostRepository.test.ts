import axios from 'axios';
import PostRepositoryFake from '@/infra/repositories/fake/PostRepositoryFake';
import PostRepository from '@/domain/repositories/PostRepository';
import AxiosClient from '@/infra/httpClient/AxiosClient';
import Post from '@/domain/entities/Post';

jest.mock('axios');
let postRepository: PostRepository;

beforeEach(async function () {
  (axios.create as jest.Mock).mockReturnThis();
  const axiosClient = new AxiosClient();
  postRepository = new PostRepositoryFake(axiosClient);
});

test('lista todas as postagens', async () => {
  const posts = await postRepository.getAll();
  expect(posts[0].id).toBe(1);
});

test('lista todas as postagens do usuário 1', async () => {
  const posts = await postRepository.getByUserId(1);
  expect(posts[0].userId).toBe(1);
});

test('lista as postagens da API', async () => {
  const fakeResp = {
    data: [
      {userId: 1, id: 1, title: 'delectus aut autem', body: 'description'},
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        body: 'description 2',
      },
    ],
  };
  (axios.get as jest.Mock).mockResolvedValue(fakeResp);
  const posts = await postRepository.getRemoteAll();
  expect(posts[0].id).toBe(1);
});

test('salvar todos dos posts', async () => {
  const post1 = new Post({
    id: 1,
    title: 'delectus aut autem',
    userId: 1,
    body: 'description',
  });
  const post2 = new Post({
    id: 2,
    title: 'task 2',
    userId: 1,
    body: 'description 2',
  });
  const post3 = new Post({
    id: 3,
    title: 'task 3',
    userId: 1,
    body: 'description 3',
  });
  await postRepository.saveAll([post1, post2, post3]);
  const posts = await postRepository.getAll();
  expect(posts.length).toBe(3);
});
