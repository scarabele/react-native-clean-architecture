import Realm from 'realm';
import {Post, Album, User, Todo} from './realmScheme';

export default class RealmConnection {
  constructor() {}

  private open() {
    return Realm.open({
      path: 'realm.app',
      schema: [Post, Album, User, Todo],
      schemaVersion: 1,
    });
  }

  async query(schemaName: string, query: string) {
    const db = await this.open();
    let results = db.objects(schemaName);
    if (query) {
      results = results.filtered(query);
    }
    return results.toJSON();
  }

  async create(schemaName: string, data: any) {
    const db = await this.open();
    db.write(() => {
      db.create(schemaName, data);
    });
  }

  async createAll(schemaName: string, data: any[]) {
    const db = await this.open();
    db.write(() => {
      data.forEach(item => {
        db.create(schemaName, item, Realm.UpdateMode.All);
      });
    });
  }
}
