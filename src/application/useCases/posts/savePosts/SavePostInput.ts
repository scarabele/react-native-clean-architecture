export default class SavePostInput {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly userId: number,
    readonly body: string,
  ) {}
}
