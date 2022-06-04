import User from '../entities/User';

export default interface UserRepository {
  getAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  getRemoteAll(): Promise<User[]>;
  saveAll(users: User[]): Promise<number>;
}
