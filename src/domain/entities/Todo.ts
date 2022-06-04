export type TodoProps = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export default class Todo {
  private _id: number;
  private _title: string;
  private _userId: number;
  private _completed: boolean;

  constructor(props: TodoProps) {
    this._id = props.id;
    this._title = props.title;
    this._userId = props.userId;
    this._completed = props.completed;
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

  get completed(): boolean {
    return this._completed;
  }

  set completed(completed: boolean) {
    this._completed = completed;
  }
}
