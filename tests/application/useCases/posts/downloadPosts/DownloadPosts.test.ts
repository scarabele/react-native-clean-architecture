import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import DownloadPosts from '@/application/useCases/posts/downloadPosts/DownloadPosts';
import AxiosClient from '@/infra/httpClient/AxiosClient';

let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
  const httpClient = new AxiosClient();
  repositoryFactory = new FakeRepositoryFactory(httpClient);
});

test('deve baixar e salvar todos os posts', async () => {
  const downloadPosts = new DownloadPosts(repositoryFactory);
  const output = await downloadPosts.execute();
  expect(output).toBeGreaterThan(1);
});
