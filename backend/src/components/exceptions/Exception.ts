export default class Exception extends Error {
  readonly message: string;
  readonly name: string;
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = this.constructor.name;
  }
}
