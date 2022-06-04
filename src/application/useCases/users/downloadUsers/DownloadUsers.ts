import User from '@/domain/entities/User';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';

export default class DownloadUsers {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(): Promise<number> {
    const userRepository = this.repositoryFactory.createUserRepository();
    const remoteUsers = await userRepository.getRemoteAll();
    const users = remoteUsers.map(
      user => new User({id: user.id, name: user.name, email: user.email}),
    );
    const output = await userRepository.saveAll(users);
    return output;
  }
}
