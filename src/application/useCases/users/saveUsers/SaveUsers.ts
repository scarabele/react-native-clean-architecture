import User from '@/domain/entities/User';
import RepositoryFactory from '@/domain/factories/RepositoryFactory';
import SaveUserInput from './SaveUserInput';

export default class SaveUsers {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async execute(input: SaveUserInput[]): Promise<number> {
    const userRepository = this.repositoryFactory.createUserRepository();
    const users = input.map(
      user => new User({id: user.id, name: user.name, email: user.email}),
    );
    const output = await userRepository.saveAll(users);
    return output;
  }
}
