import Album from '@/domain/entities/Album';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import SqliteConnection from '@/infra/database/sqliteDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class AlbumRepositorySqlite implements AlbumRepository {
  constructor(readonly httpClient: HttpClient, readonly db: SqliteConnection) {}

  async findById(id: number): Promise<Album> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from albums where id = ?',
        args: [id],
      });
      if (results.rows.length === 0) {
        throw new RepositoryInfraExeption('Album não encontrada');
      }
      return new Album({
        id: results.rows.raw()[0].id,
        title: results.rows.raw()[0].title,
        userId: results.rows.raw()[0].userId,
      });
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<Album[]> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from albums',
        args: [],
      });
      return results.rows.raw().map(
        result =>
          new Album({
            id: result.id,
            title: result.title,
            userId: result.userId,
          }),
      );
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getByUserId(userId: number): Promise<Album[]> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from albums where userId = ?',
        args: [userId],
      });
      return results.rows.raw().map(
        result =>
          new Album({
            id: result.id,
            title: result.title,
            userId: result.userId,
          }),
      );
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getRemoteAll(): Promise<Album[]> {
    const response = await this.httpClient.get('/albums');
    return response.data.map((album: any) => new Album(album));
  }

  async saveAll(albums: Album[]): Promise<number> {
    try {
      let counter = 0;
      const sql =
        'insert or replace into albums (id,title,userId) values (?,?,?)';
      for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
        const results = await this.db.execute({
          sqlStatement: sql,
          args: [album.id, album.title, album.userId],
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
