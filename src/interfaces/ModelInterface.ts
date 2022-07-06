export interface Model<T> {
  create(Object: T): Promise<T>
  read(): Promise<T[]>
  readOne(string: string): Promise<T | null>
  update(string: string, Object: T): Promise<T | null>
  delete(string: string): Promise<T | null>
}
