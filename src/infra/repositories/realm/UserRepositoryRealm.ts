import User from '@/domain/entities/User';
import UserRepository from '@/domain/repositories/UserRepository';
import RealmConnection from '@/infra/database/realmDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class UserRepositoryRealm implements UserRepository {
  constructor(readonly httpClient: HttpClient, readonly db: RealmConnection) {}

  async findById(id: number): Promise<User> {
    try {
      const results = await this.db.query('User', `id == ${id}`);
      if (results.length === 0) {
        throw new RepositoryInfraExeption('Usuário não encontrado');
      }
      return new User({
        id: results[0].id,
        name: results[0].name,
        email: results[0].email,
      });
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const results = await this.db.query('User', '');
      return results.map(
        result =>
          new User({id: result.id, name: result.name, email: result.email}),
      );
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }

  async getRemoteAll(): Promise<User[]> {
    const response = await this.httpClient.get('/users');
    return response.data.map((user: any) => new User(user));
  }

  async saveAll(users: User[]): Promise<number> {
    try {
      const mapper = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
      await this.db.createAll('User', mapper);
      return users.length;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
