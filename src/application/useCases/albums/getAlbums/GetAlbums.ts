import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetAlbumOutput from './GetAlbumOutput';

export default class GetAlbums {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<GetAlbumOutput[]> {
    const albumRepository = this.repositoryFactory.createAlbumRepository();
    const albums = await albumRepository.getAll();
    return albums.map(
      album => new GetAlbumOutput(album.id, album.title, album.userId),
    );
  }
}
