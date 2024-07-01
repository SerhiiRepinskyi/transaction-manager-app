declare module "sql.js" {
  export interface SqlJsStatic {
    Database: new () => SqlJsDatabase;
  }

  export interface SqlJsDatabase {
    run(sql: string): void;
    prepare(sql: string): SqlJsStatement;
    close(): void;
  }

  export interface SqlJsStatement {
    run(values?: (string | number | null)[]): void;
    getAsObject<T = Record<string, string | number | null>>(): T;
    step(): boolean;
    free(): void;
  }

  export interface InitSqlJsConfig {
    locateFile?: (file: string, prefix: string) => string;
    [key: string]: unknown;
  }

  const initSqlJs: (config?: InitSqlJsConfig) => Promise<SqlJsStatic>;
  export default initSqlJs;
}
