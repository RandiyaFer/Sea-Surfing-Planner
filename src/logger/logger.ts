import { createLogger, format, transports, add } from 'winston';
import * as appInsights from 'applicationinsights';
import { db } from '../config/dbconfig';

const { combine, timestamp } = format;

export function loggerFactory(db: Db) {
  return createLogger({
    defaultMeta: {
      component: 'surfy_backend'
    },
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      })
    ),
    transports: [
      new transports.Console({
        // level: config.settings.logLevel,
        format: format.simple(),
        debugStdout: true,
      })
    ]
  });
}

