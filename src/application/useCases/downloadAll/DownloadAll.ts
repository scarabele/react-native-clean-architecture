import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import DownloadUsers from '../users/downloadUsers/DownloadUsers';
import DownloadTodos from '../todos/downloadTodos/DownloadTodos';
import DownloadAlbums from '../albums/downloadAlbums/DownloadAlbums';
import DownloadPosts from '../posts/downloadPosts/DownloadPosts';

export default class DownloadAll {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<number> {
    let output = 0;
    const downloadUsers = new DownloadUsers(this.repositoryFactory);
    const downloadTodos = new DownloadTodos(this.repositoryFactory);
    const downloadAlbums = new DownloadAlbums(this.repositoryFactory);
    const downloadPosts = new DownloadPosts(this.repositoryFactory);
    output += await downloadUsers.execute();
    output += await downloadTodos.execute();
    output += await downloadAlbums.execute();
    output += await downloadPosts.execute();
    return output;
  }
}
