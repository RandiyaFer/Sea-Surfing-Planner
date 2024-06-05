import path from 'node:path';
import { ParsedArgs } from 'minimist';
import { name as appName, version as appVersion } from '../package.json';


export type EnvName = 'local' | 'dev' | 'test' | 'qa' | 'prod';

type EndpointType = {
  url: string;
  key?: string;
  originatingSystem?: string;
};

export interface Config {
  env: {
    name: EnvName;
  };
  app: {
    name: string;
    version: string;
    buildId?: string;
  };
  settings: {
    server: {
      hostName: string;
      port: number;
    };
    database: {
      name: string;
      hostname: string;
      username: string;
      password: string;
      requestTimeout: string;
    };
    // azure: {
    //   clientId: string;
    //   appInsightsConnectionString: string;
    //   appConfigConnectionString: string;
    // };
    useCache: boolean;
    logLevel: string;
  };
  paths: {
    root: string;
  };
}

export interface Args extends ParsedArgs {
  cache: boolean;
  local: boolean;
}

export function resolveConfig(args?: Args): Config {
  const envName = process.env.ENV_NAME as EnvName;
  console.log('eeee:', process.env.DB_USER);
  return {
    app: {
      name: appName,
      version: appVersion,
      buildId: process.env.BUILD_ID
    },
    env: {
      name: envName
    },
    settings: {
      server: {
        hostName: process.env.IP || '0.0.0.0',
        port: 8080,
      },
      database: {
        name: 'surfing_backend',
        hostname: 'localhost',
        username: 'sa',
        password: 'pamindu1234',
        requestTimeout: '5000'
      },
      useCache: false,
      logLevel: ''
    },
    paths: {
      root: path.resolve('.'),
    },
  };
}
