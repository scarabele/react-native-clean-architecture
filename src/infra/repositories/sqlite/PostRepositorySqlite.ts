import Post from '@/domain/entities/Post';
import PostRepository from '@/domain/repositories/PostRepository';
import SqliteConnection from '@/infra/database/sqliteDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class PostRepositorySqlite implements PostRepository {
  constructor(readonly httpClient: HttpClient, readonly db: SqliteConnection) {}

  async findById(id: number): Promise<Post> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from posts where id = ?',
        args: [id],
      });
      if (results.rows.length === 0) {
        throw new RepositoryInfraExeption('Postagem não encontrada');
      }
      return new Post({
        id: results.rows.raw()[0].id,
        title: results.rows.raw()[0].title,
        userId: results.rows.raw()[0].userId,
        body: results.rows.raw()[0].body,
      });
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<Post[]> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from posts',
        args: [],
      });
      return results.rows.raw().map(
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
      const results = await this.db.execute({
        sqlStatement: 'select * from posts where userId = ?',
        args: [userId],
      });
      return results.rows.raw().map(
        result =>
          new Post({
            id: result.id,
            title: result.title,
            userId: result.userId,
            body: result.body,
          }),
      );
    } catch (error) {
      console.error(error);
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
      let counter = 0;
      const sql =
        'insert or replace into posts (id,title,userId,body) values (?,?,?,?)';
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const results = await this.db.execute({
          sqlStatement: sql,
          args: [post.id, post.title, post.userId, post.body],
        });
        counter += results.rowsAffected;
      }
      return counter;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
