import Post from '../entities/Post';

export default interface PostRepository {
  getAll(): Promise<Post[]>;
  getByUserId(userId: number): Promise<Post[]>;
  getRemoteAll(): Promise<Post[]>;
  saveAll(posts: Post[]): Promise<number>;
}
