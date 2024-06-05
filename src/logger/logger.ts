import { createLogger, format, transports, add } from 'winston';
import * as appInsights from 'applicationinsights';
import { Config } from '../config';

const { combine, timestamp } = format;

export function loggerFactory(config: Config) {
  return createLogger({
    defaultMeta: {
      component: 'surfing_backend'
    },
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      })
    ),
    transports: [
      new transports.Console({
        level: config.settings.logLevel,
        format: format.simple(),
        debugStdout: true,
      })
    ]
  });
}

