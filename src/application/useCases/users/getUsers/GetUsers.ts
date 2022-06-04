import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import GetUserOutput from './GetUserOutput';

export default class GetUsers {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<GetUserOutput[]> {
    const userRepository = this.repositoryFactory.createUserRepository();
    const users = await userRepository.getAll();
    return users.map(user => new GetUserOutput(user.id, user.name, user.email));
  }
}
