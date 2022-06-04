import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import UserRepository from '@/domain/repositories/UserRepository';
import UserRepositorySqlite from '../repositories/sqlite/UserRepositorySqlite';
import AlbumRepositorySqlite from '../repositories/sqlite/AlbumRepositorySqlite';
import TodoRepository from '@/domain/repositories/TodoRepository';
import TodoRepositorySqlite from '../repositories/sqlite/TodoRepositorySqlite';
import PostRepository from '@/domain/repositories/PostRepository';
import PostRepositorySqlite from '../repositories/sqlite/PostRepositorySqlite';
import HttpClient from '../httpClient/HttpClient';
import SqliteConnection from '../database/sqliteDb';

export default class SqliteRepositoryFactory implements RepositoryFactory {
  constructor(readonly httpClient: HttpClient, readonly db: SqliteConnection) {}

  createAlbumRepository(): AlbumRepository {
    return new AlbumRepositorySqlite(this.httpClient, this.db);
  }

  createUserRepository(): UserRepository {
    return new UserRepositorySqlite(this.httpClient, this.db);
  }

  createTodoRepository(): TodoRepository {
    return new TodoRepositorySqlite(this.httpClient, this.db);
  }

  createPostRepository(): PostRepository {
    return new PostRepositorySqlite(this.httpClient, this.db);
  }
}
