import Album from '@/domain/entities/Album';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import SaveAlbumInput from './SaveAlbumInput';

export default class SaveAlbums {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: SaveAlbumInput[]): Promise<number> {
    const albumRepository = this.repositoryFactory.createAlbumRepository();
    const albums = input.map(
      album =>
        new Album({id: album.id, title: album.title, userId: album.userId}),
    );
    const output = await albumRepository.saveAll(albums);
    return output;
  }
}
