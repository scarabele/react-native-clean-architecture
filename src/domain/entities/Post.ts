export type PostProps = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

export default class Post {
  private _id: number;
  private _title: string;
  private _userId: number;
  private _body: string;

  constructor(props: PostProps) {
    this._id = props.id;
    this._title = props.title;
    this._userId = props.userId;
    this._body = props.body;
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

  get body(): string {
    return this._body;
  }

  set body(body: string) {
    this._body = body;
  }
}
