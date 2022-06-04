//import FakeRepositoryFactory from '@/infra/factories/FakeRepositoryFactory';
import SqliteRepositoryFactory from '@/infra/factories/SqliteRepositoryFactory';
//import RealmRepositoryFactory from '@/infra/factories/RealmRepositoryFactory';
import AxiosClient from '@/infra/httpClient/AxiosClient';
import SqliteConnection from '@/infra/database/sqliteDb';
//import RealmConnection from '@/infra/database/realmDb';

const useFactory = () => {
  const axiosClient = new AxiosClient();

  // FAKE REPOSITORY
  //const repositoryFactory = new FakeRepositoryFactory(axiosClient);

  // SQLITE REPOSITORY
  const db = new SqliteConnection();
  const repositoryFactory = new SqliteRepositoryFactory(axiosClient, db);

  // REALM REPOSITORY
  // const db = new RealmConnection();
  // const repositoryFactory = new RealmRepositoryFactory(axiosClient, db);

  return {
    repositoryFactory,
  };
};

export default useFactory;
