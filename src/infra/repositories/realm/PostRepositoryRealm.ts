import Post from '@/domain/entities/Post';
import PostRepository from '@/domain/repositories/PostRepository';
import RealmConnection from '@/infra/database/realmDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class PostRepositoryRealm implements PostRepository {
  constructor(readonly httpClient: HttpClient, readonly db: RealmConnection) {}

  async findById(id: number): Promise<Post> {
    try {
      const results = await this.db.query('Post', `id == ${id}`);
      if (results.length === 0) {
        throw new RepositoryInfraExeption('Postagem não encontrada');
      }
      return new Post({
        id: results[0].id,
        title: results[0].title,
        userId: results[0].userId,
        body: results[0].body,
      });
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<Post[]> {
    try {
      const results = await this.db.query('Post', '');
      return results.map(
        result =>
          new Post({
            id: result.id,
            title: result.title,
            userId: result.userId,
            body: result.body,
          }),
      );
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getByUserId(userId: number): Promise<Post[]> {
    try {
      const results = await this.db.query('Post', `userId == ${userId}`);
      return results.map(
        result =>
          new Post({
            id: result.id,
            title: result.title,
            userId: result.userId,
            body: result.body,
          }),
      );
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getRemoteAll(): Promise<Post[]> {
    const response = await this.httpClient.get('/posts');
    return response.data.map((post: any) => new Post(post));
  }

  async saveAll(posts: Post[]): Promise<number> {
    try {
      const mapper = posts.map(post => ({
        id: post.id,
        title: post.title,
        userId: post.userId,
        body: post.body,
      }));
      await this.db.createAll('Post', mapper);
      return posts.length;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
