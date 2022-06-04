import User from '@/domain/entities/User';
import UserRepository from '@/domain/repositories/UserRepository';
import SqliteConnection from '@/infra/database/sqliteDb';
import RepositoryInfraExeption from '@/infra/exeptions/RepositoryException';
import HttpClient from '@/infra/httpClient/HttpClient';

export default class UserRepositorySqlite implements UserRepository {
  constructor(readonly httpClient: HttpClient, readonly db: SqliteConnection) {}

  async findById(id: number): Promise<User> {
    try {
      const results = await this.db.execute({
        sqlStatement: 'select * from users where id = ?',
        args: [id],
      });
      if (results.rows.length === 0) {
        throw new RepositoryInfraExeption('Usuário não encontrado');
      }
      return new User({
        id: results.rows.raw()[0].id,
        name: results.rows.raw()[0].name,
        email: results.rows.raw()[0].email,
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
      const results = await this.db.execute({
        sqlStatement: 'select * from users',
        args: [],
      });
      return results.rows
        .raw()
        .map(
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
      let counter = 0;
      const sql = 'insert or replace into users (id,name,email) values (?,?,?)';
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const results = await this.db.execute({
          sqlStatement: sql,
          args: [user.id, user.name, user.email],
        });
        counter += results.rowsAffected;
      }
      return counter;
    } catch (error) {
      console.error(error);
      throw new RepositoryInfraExeption(
        'Erro ao conectar com o banco de dados',
      );
    }
  }
}
