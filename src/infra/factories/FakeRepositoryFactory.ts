import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import UserRepository from '@/domain/repositories/UserRepository';
import UserRepositoryFake from '../repositories/fake/UserRepositoryFake';
import AlbumRepositoryFake from '../repositories/fake/AlbumRepositoryFake';
import TodoRepository from '@/domain/repositories/TodoRepository';
import TodoRepositoryFake from '../repositories/fake/TodoRepositoryFake';
import PostRepository from '@/domain/repositories/PostRepository';
import PostRepositoryFake from '../repositories/fake/PostRepositoryFake';
import HttpClient from '../httpClient/HttpClient';

export default class FakeRepositoryFactory implements RepositoryFactory {
  constructor(readonly httpClient: HttpClient) {}

  createAlbumRepository(): AlbumRepository {
    return new AlbumRepositoryFake(this.httpClient);
  }

  createUserRepository(): UserRepository {
    return new UserRepositoryFake(this.httpClient);
  }

  createTodoRepository(): TodoRepository {
    return new TodoRepositoryFake(this.httpClient);
  }

  createPostRepository(): PostRepository {
    return new PostRepositoryFake(this.httpClient);
  }
}
