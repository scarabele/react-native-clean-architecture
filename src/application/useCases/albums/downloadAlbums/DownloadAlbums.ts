import Album from '@/domain/entities/Album';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';

export default class SaveAlbums {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<number> {
    const albumRepository = this.repositoryFactory.createAlbumRepository();
    const remoteAlbums = await albumRepository.getRemoteAll();
    const albums = remoteAlbums.map(
      album =>
        new Album({id: album.id, title: album.title, userId: album.userId}),
    );
    const output = await albumRepository.saveAll(albums);
    return output;
  }
}
