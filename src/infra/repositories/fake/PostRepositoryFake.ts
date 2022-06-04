import Post from '@/domain/entities/Post';
import PostRepository from '@/domain/repositories/PostRepository';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class PostRepositoryFake implements PostRepository {
  posts: Post[];

  constructor(readonly httpClient: HttpClient) {
    const post1 = new Post({
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
      body: 'quia et suscipit',
    });
    const post2 = new Post({
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      userId: 1,
      body: 'et iusto sed quo iure',
    });
    this.posts = [post1, post2];
  }

  async getAll(): Promise<Post[]> {
    return this.posts;
  }

  async getByUserId(userId: number): Promise<Post[]> {
    return this.posts.filter(post => post.userId === userId);
  }

  async getRemoteAll(): Promise<Post[]> {
    const response = await this.httpClient.get('/posts');
    return response.data.map((post: any) => new Post(post));
  }

  async saveAll(posts: Post[]): Promise<number> {
    this.posts = posts;
    return this.posts.length;
  }
}
