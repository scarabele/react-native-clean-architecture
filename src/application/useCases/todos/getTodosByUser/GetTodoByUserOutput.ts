export default class GetTodoOutput {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly userId: number,
    readonly completed: boolean,
  ) {}
}
