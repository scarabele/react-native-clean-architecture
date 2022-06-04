import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export default class SqliteConnection {
  constructor() {
    this.createTables();
  }

  private open() {
    return SQLite.openDatabase({name: 'db.app'});
  }

  private async createTables() {
    const db = await this.open();
    const sqlUsers =
      'create table if not exists users (id integer primary key not null, name text, email text);';
    const sqlTodos =
      'create table if not exists todos (id integer primary key not null, title text, userId int, completed int);';
    const sqlAlbums =
      'create table if not exists albums (id integer primary key not null, title text, userId int);';
    const sqlPosts =
      'create table if not exists posts (id integer primary key not null, title text, userId int, body text);';
    await db.transaction(tx => {
      tx.executeSql(sqlUsers);
      tx.executeSql(sqlTodos);
      tx.executeSql(sqlAlbums);
      tx.executeSql(sqlPosts);
    });
  }

  async execute({
    sqlStatement,
    args = [],
  }: {
    sqlStatement: string;
    args?: any[];
  }): Promise<SQLite.ResultSet> {
    const db = await this.open();
    const result = await db.executeSql(sqlStatement, args);
    return result[0];
  }
}
