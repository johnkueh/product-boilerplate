import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager
} from "typeorm";

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  private async connection(
    connectionOptions: ConnectionOptions
  ): Promise<Connection> {
    const CONNECTION_NAME = `default`;

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      // console.log(`Database.getConnection()-using existing connection ...`);
      connection = await this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      // console.log(`Database.getConnection()-creating connection ...`);
      connection = await createConnection(connectionOptions);
    }

    return connection;
  }

  public async getConnection(
    connectionOptions: ConnectionOptions
  ): Promise<Connection> {
    return this.connection(connectionOptions);
  }
}
