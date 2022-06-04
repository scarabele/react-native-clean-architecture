import Email from '../valueObjects/Email';

export type UserProps = {
  id: number;
  name: string;
  email: string;
};

export default class User {
  private _id: number;
  private _name: string;
  private _email: Email;

  constructor(props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._email = new Email(props.email);
  }

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email() {
    return this._email.value;
  }

  set email(email: string) {
    this._email = new Email(email);
  }
}
