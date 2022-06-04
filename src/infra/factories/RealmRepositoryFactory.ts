import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import UserRepository from '@/domain/repositories/UserRepository';
import UserRepositoryRealm from '../repositories/realm/UserRepositoryRealm';
import AlbumRepositoryRealm from '../repositories/realm/AlbumRepositoryRealm';
import TodoRepository from '@/domain/repositories/TodoRepository';
import TodoRepositoryRealm from '../repositories/realm/TodoRepositoryRealm';
import PostRepository from '@/domain/repositories/PostRepository';
import PostRepositoryRealm from '../repositories/realm/PostRepositoryRealm';
import HttpClient from '../httpClient/HttpClient';
import RealmConnection from '../database/realmDb';

export default class RealmRepositoryFactory implements RepositoryFactory {
  constructor(readonly httpClient: HttpClient, readonly db: RealmConnection) {}

  createAlbumRepository(): AlbumRepository {
    return new AlbumRepositoryRealm(this.httpClient, this.db);
  }

  createUserRepository(): UserRepository {
    return new UserRepositoryRealm(this.httpClient, this.db);
  }

  createTodoRepository(): TodoRepository {
    return new TodoRepositoryRealm(this.httpClient, this.db);
  }

  createPostRepository(): PostRepository {
    return new PostRepositoryRealm(this.httpClient, this.db);
  }
}
