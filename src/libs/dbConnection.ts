import {
    DataSource,
    DataSourceOptions,
  } from "typeorm";
  import { entities } from "../entities";
  /**
   * Reference : https://medium.com/safara-engineering/wiring-up-typeorm-with-serverless-5cc29a18824f
   * The below code is extended a bit from the above reference
   */
  export class Database {
    private static dataSourceManager : {[key:string] : DataSource} = {};
    constructor() {}
  
    public getConnection = async (config: any): Promise<DataSource> => {
      const CONNECTION_NAME = `consgia`;
  
      let dataSource: DataSource ;
      if (Database.dataSourceManager && Database.dataSourceManager[CONNECTION_NAME]) {
        dataSource = Database.dataSourceManager[CONNECTION_NAME];
        dataSource = injectConnectionOptions(dataSource, config);
        if (!dataSource.initialize) {
          dataSource = await dataSource.initialize();
        }
      } else {
        const dataSourceObject = new DataSource(config)
        dataSource = await dataSourceObject.initialize()
        Database.dataSourceManager = {
          [CONNECTION_NAME] : dataSource
        }
      }
  
      return dataSource;
    };
  }
  
  export const initiateDbConnection = async (): Promise<DataSource> => {
    const dbConnection = new Database();
    const dataSource: DataSource = await dbConnection.getConnection({
      name: `consgia`,
      type: `postgres`,
      port: 5432,
      synchronize: false,
      logging: true,
      host: process.env.TYPE_ORM_HOST,
      database: process.env.TYPE_ORM_DB,
      username: process .env.TYPE_ORM_USERNAME,
      password: process.env.TYPE_ORM_PASSWORD,
      entities,
    });
    return dataSource;
  };
  
  export const injectConnectionOptions = (
    dataSource: DataSource,
    dataSourceOptions: DataSourceOptions
  ) => {
    // @ts-ignore
    dataSource.options = dataSourceOptions;
    // @ts-ignore
    dataSource.manager = dataSource.createEntityManager();
    // @ts-ignore
    dataSource.buildMetadatas();
    return dataSource;
  };
  