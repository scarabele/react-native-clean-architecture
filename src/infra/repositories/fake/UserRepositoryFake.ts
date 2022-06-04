import User from '@/domain/entities/User';
import UserRepository from '@/domain/repositories/UserRepository';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class UserRepositoryFake implements UserRepository {
  users: User[];

  constructor(readonly httpClient: HttpClient) {
    const user1 = new User({
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
    });
    const user2 = new User({
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
    });
    this.users = [user1, user2];
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new RepositoryInfraExeption('Usuário não encontrado');
    }
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getRemoteAll(): Promise<User[]> {
    const response = await this.httpClient.get('/users');
    return response.data.map((user: any) => new User(user));
  }

  async saveAll(users: User[]): Promise<number> {
    this.users = users;
    return this.users.length;
  }
}
