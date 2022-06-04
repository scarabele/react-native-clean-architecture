import UserDomainException from '../exeptions/UserDomainException';

export default class Email {
  private _value: string;

  constructor(email: string) {
    this.validation(email);
    this._value = email;
  }

  private validation(email: string) {
    const isValid = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    if (!isValid) {
      throw new UserDomainException('E-mail inválido');
    }
  }

  get value() {
    return this._value;
  }
}
