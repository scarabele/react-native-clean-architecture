import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetPostByUserOutput from './GetPostByUserOutput';
import GetPostByUserInput from './GetPostByUserInput';

export default class GetPostsByUser {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: GetPostByUserInput): Promise<GetPostByUserOutput[]> {
    const postRepository = this.repositoryFactory.createPostRepository();
    const posts = await postRepository.getByUserId(input.id);
    return posts.map(
      post =>
        new GetPostByUserOutput(post.id, post.title, post.userId, post.body),
    );
  }
}
