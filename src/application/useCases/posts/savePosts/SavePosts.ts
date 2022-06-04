import Post from '@/domain/entities/Post';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import SavePostInput from './SavePostInput';

export default class SavePosts {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: SavePostInput[]): Promise<number> {
    const postRepository = this.repositoryFactory.createPostRepository();
    const posts = input.map(
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
