import UserRepository from '../repositories/UserRepository';
import AlbumRepository from '../repositories/AlbumRepository';
import TodoRepository from '../repositories/TodoRepository';
import PostRepository from '../repositories/PostRepository';

export default interface RepositoryFactory {
  createUserRepository(): UserRepository;
  createAlbumRepository(): AlbumRepository;
  createTodoRepository(): TodoRepository;
  createPostRepository(): PostRepository;
}
