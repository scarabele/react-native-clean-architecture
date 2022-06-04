import Album from '../entities/Album';

export default interface AlbumRepository {
  getAll(): Promise<Album[]>;
  getByUserId(userId: number): Promise<Album[]>;
  getRemoteAll(): Promise<Album[]>;
  saveAll(albums: Album[]): Promise<number>;
}
