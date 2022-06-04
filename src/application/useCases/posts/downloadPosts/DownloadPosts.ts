import Post from '@/domain/entities/Post';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';

export default class SavePosts {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<number> {
    const postRepository = this.repositoryFactory.createPostRepository();
    const remotePosts = await postRepository.getRemoteAll();
    const posts = remotePosts.map(
      post =>
        new Post({
          id: post.id,
          title: post.title,
          userId: post.userId,
          body: post.body,
        }),
    );
    const output = await postRepository.saveAll(posts);
    return output;
  }
}
