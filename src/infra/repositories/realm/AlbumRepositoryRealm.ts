import Album from '@/domain/entities/Album';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import RealmConnection from '@/infra/database/realmDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class AlbumRepositoryRealm implements AlbumRepository {
  constructor(readonly httpClient: HttpClient, readonly db: RealmConnection) {}

  async findById(id: number): Promise<Album> {
    try {
      const results = await this.db.query('Album', `id == ${id}`);
      if (results.length === 0) {
        throw new RepositoryInfraExeption('Álbum não encontrado');
      }
      return new Album({
        id: results[0].id,
        title: results[0].title,
        userId: results[0].userId,
      });
    } catch (error) {
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<Album[]> {
    try {
      const results = await this.db.query('Album', '');
      return results.map(
        result =>
          new Album({
            id: result.id,
            title: result.title,
            userId: result.userId,
          }),
      );
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getByUserId(userId: number): Promise<Album[]> {
    try {
      const results = await this.db.query('Album', `userId == ${userId}`);
      return results.map(
        result =>
          new Album({
            id: result.id,
            title: result.title,
            userId: result.userId,
          }),
      );
    } catch (error) {
      console.error(error);
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
      const mapper = albums.map(album => ({
        id: album.id,
        title: album.title,
        userId: album.userId,
      }));
      await this.db.createAll('Album', mapper);
      return albums.length;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
