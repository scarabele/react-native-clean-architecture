import Album from '@/domain/entities/Album';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class AlbumRepositoryFake implements AlbumRepository {
  albums: Album[];

  constructor(readonly httpClient: HttpClient) {
    const album1 = new Album({
      id: 1,
      title: 'quidem molestiae enim',
      userId: 1,
    });
    const album2 = new Album({
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
      userId: 1,
    });
    this.albums = [album1, album2];
  }

  async getAll(): Promise<Album[]> {
    return this.albums;
  }

  async getByUserId(userId: number): Promise<Album[]> {
    return this.albums.filter(album => album.userId === userId);
  }

  async getRemoteAll(): Promise<Album[]> {
    const response = await this.httpClient.get('/albums');
    return response.data.map((album: any) => new Album(album));
  }

  async saveAll(albums: Album[]): Promise<number> {
    this.albums = albums;
    return this.albums.length;
  }
}
