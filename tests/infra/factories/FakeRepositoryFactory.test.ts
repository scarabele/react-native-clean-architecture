import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import AxiosClient from '@/infra/httpClient/AxiosClient';

test('verifica se os reositorios foram criados', () => {
  const httpClient = new AxiosClient();
  const repositoryFactory = new FakeRepositoryFactory(httpClient);
  const userRepository = repositoryFactory.createUserRepository();
  const albumRepository = repositoryFactory.createAlbumRepository();
  const todoRepository = repositoryFactory.createTodoRepository();
  const postRepository = repositoryFactory.createPostRepository();
  expect(userRepository).toBeTruthy();
  expect(albumRepository).toBeTruthy();
  expect(todoRepository).toBeTruthy();
  expect(postRepository).toBeTruthy();
});
