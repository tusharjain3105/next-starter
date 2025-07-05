export type PromiseResponse<T = unknown> = Promise<
  readonly [Error] | readonly [undefined, T]
>;
