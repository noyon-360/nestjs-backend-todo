export class Result<T> {
  constructor(
      public readonly status: boolean = true,
      public readonly message: string = 'Success',
      public readonly data: T | null = null,
  ) {}

  static success<T>(data: T, message?: string): Result<T> {
    return new Result(true, message ?? 'Success', data);
  }

  static error(message: string): Result<null> {
    return new Result(false, message, null);
  }
}