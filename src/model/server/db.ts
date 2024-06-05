import { ColumnValue, Connection, Request, TediousType } from 'tedious';

const ConnectionPool = require('tedious-connection-pool2');
import { Config } from '../../config';

const DB_CONNECTION_POOL_CONFIG = {
  min: 1,
  max: 7,
  log: true
};

export function dbConnectionConfigFactory(config: Config): any {
  return {
    authentication: {
      type: 'default',
      options: {
        userName: config.settings.database.username,
        password: config.settings.database.password
      }
    },
    dialectOptions: {
      options: { requestTimeout: config.settings.database.requestTimeout }
    },
    options: {
      database: config.settings.database.name,
      trustServerCertificate: true,
      validateBulkLoadParameters: true
    },
    server: config.settings.database.hostname
  };
}

export class Db {

  readonly pool = new ConnectionPool(DB_CONNECTION_POOL_CONFIG, this.config);

  constructor(readonly config: any) {
    // eslint-disable-next-line no-console
    this.pool.on('error', (err: any) => console.error(err));
  }

  /**
   * Execute SQL query
   */
  async executeQuery<T>(query: string): Promise<T[]> {
    return new Promise((resolve, reject) => {

      this.pool.acquire((err: any, connection: Connection) => {

        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          reject(err);
          return err;
        }

        const request = new Request(query, (err: any, rowCount: any) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            reject(err);
            return err;
          }
          connection.close();
        });


        let result = '';
        request
          .on('row', (columns: ColumnValue[]) => {
            const data = columns.map(column => column.value);
            result = result.concat(data.toString());
          })
          .on('requestCompleted', () => {
            if (result && result !== '') {
              try {
                const parsedResult = JSON.parse(String(result));
                resolve(parsedResult);
              } catch (err) {
                console.log(err);
                resolve([]);
              }
            }else{
              resolve([]);
            }
          });

        connection.execSql(request);
      });
    });
  }

  /**
   * Execute Stored Procedure (SP)
   */
  async executeSPP<T>(spName: string, requestParams: {
    name: string,
    type: TediousType,
    value: any
  }[]): Promise<T[]> {
    // eslint-disable-next-line no-console
    console.log(spName);

    return new Promise((resolve, reject) => {
      this.pool.acquire((err: any, connection: Connection) => {
        if (err) {
          reject(err);
        }

        const request = new Request(spName, (err: any, rowCount: any) => {
          if (err) {
            reject(err);
          }
          connection.close();
        });

        requestParams.forEach(param => {
          request.addParameter(param.name, param.type, param.value);
        });

        let result: any = null;

        request
          .on('doneProc', (rowCount: number, more: boolean, returnStatus: any, rows: T[]) => {
            result = rows;
            resolve(rows);
          })
          .on('requestCompleted', () => {
            resolve(result);
          });

        connection.callProcedure(request);
      });
    });
  }
  async executeSP<T>(spName: string, requestParams: {
    name: string,
    type: TediousType,
    value: any
  }[]): Promise<T[]> {

    return new Promise((resolve, reject) => {
      this.pool.acquire((err: any, connection: Connection) => {
        if (err) {
          reject(err);
        }

        const request = new Request(spName, (err: any, rowCount: number, rows: T[]) => {
          if (err) {
            reject(err);
          }
          connection.close();
        });

        requestParams.forEach(param => {
          request.addParameter(param.name, param.type, param.value);
        });

        let result: T[] = [];

        request.on('row', (columns: ColumnValue[]) => {
          const row = {} as T;
          columns.forEach(column => {
            row[column.metadata.colName] = column.value;
          });
          result.push(row);
        });

        request.on('requestCompleted', () => {
          resolve(result);
        });

        connection.callProcedure(request);
      });
    });
  }

}
