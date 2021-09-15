export interface Ref<T> { value: T }
export interface WrappedPromise<T> extends Promise<T> {
  resolve(v: T): void
  reject(e: Error): void
  promise: Promise<T>
}
