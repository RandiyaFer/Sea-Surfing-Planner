import parseArgs from 'minimist';
import dotenv from 'dotenv';
import { Args, resolveConfig } from './config';
import { contextFactory } from './context';
import { AppServer } from './app';

try {
  const args = parseArgs(process.argv, { boolean: ['cache', 'local'] }) as Args;
  if (args.local) {
    const cfg = dotenv.config({ path: './.env', encoding: 'utf8' });
    if (cfg.error) {
      throw cfg.error;
    }
  }
  const config = resolveConfig(args);
  const context = contextFactory(config); 
  const app = new AppServer(context);
  context.logger.info('Starting surfy Backend Server...');
  app.start();
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('Server initialization failed', e);
  process.exit(0);
}
 