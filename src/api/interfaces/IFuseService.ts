export interface IFuseService {
  getResults<T>(query: string, array: T[], keys: string[]): T[];
}