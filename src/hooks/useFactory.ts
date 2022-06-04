import AxiosClient from '@/infra/httpClient/AxiosClient';
//import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
//import SqliteRepositoryFactory from '@/infra/factories/SqliteRepositoryFactory';
//import SqliteConnection from '@/infra/database/sqliteDb';
import RealmRepositoryFactory from '@/infra/factories/RealmRepositoryFactory';
import RealmConnection from '@/infra/database/realmDb';

const useFactory = () => {
  const axiosClient = new AxiosClient();

  // FAKE REPOSITORY FACTORY
  //const repositoryFactory = new FakeRepositoryFactory(axiosClient);

  // SQLITE REPOSITORY FACTORY
  // const db = new SqliteConnection();
  // const repositoryFactory = new SqliteRepositoryFactory(axiosClient, db);

  // REALM REPOSITORY FACTORY
  const db = new RealmConnection();
  const repositoryFactory = new RealmRepositoryFactory(axiosClient, db);

  return {
    repositoryFactory,
  };
};

export default useFactory;
