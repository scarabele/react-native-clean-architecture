import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetAlbumByUserOutput from './GetAlbumByUserOutput';
import GetAlbumByUserInput from './GetAlbumByUserInput';

export default class GetAlbumByUser {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: GetAlbumByUserInput): Promise<GetAlbumByUserOutput[]> {
    const albumRepository = this.repositoryFactory.createPostRepository();
    const albums = await albumRepository.getByUserId(input.id);
    return albums.map(
      album => new GetAlbumByUserOutput(album.id, album.title, album.userId),
    );
  }
}
