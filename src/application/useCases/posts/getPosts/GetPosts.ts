import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetPostOutput from './GetPostOutput';

export default class GetPosts {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<GetPostOutput[]> {
    const postRepository = this.repositoryFactory.createPostRepository();
    const posts = await postRepository.getAll();
    return posts.map(
      post => new GetPostOutput(post.id, post.title, post.userId, post.body),
    );
  }
}
