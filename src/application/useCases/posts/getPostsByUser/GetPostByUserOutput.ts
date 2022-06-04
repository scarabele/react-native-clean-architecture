export default class GetPostOutput {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly userId: number,
    readonly body: string,
  ) {}
}
