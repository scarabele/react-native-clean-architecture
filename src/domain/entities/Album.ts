export type AlbumProps = {
  id: number;
  title: string;
  userId: number;
};

export default class Album {
  private _id: number;
  private _title: string;
  private _userId: number;

  constructor(props: AlbumProps) {
    this._id = props.id;
    this._title = props.title;
    this._userId = props.userId;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get title(): string {
    return this._title;
  }

  get userId(): number {
    return this._userId;
  }

  set title(title: string) {
    this._title = title;
  }

  set userId(userId: number) {
    this._userId = userId;
  }
}
