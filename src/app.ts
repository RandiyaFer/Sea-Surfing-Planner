import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { Context } from './context';
import { RootController } from './routes/root-controller';

export class AppServer {
  private readonly app = express();
  private readonly server = http.createServer(this.app);

  constructor(private context: Context) {
    if (context.envName === 'local') {
      this.app.use(cors({
        origin: '*'
      }));
    }
    this.app
      .use(express.json())
      .use(express.urlencoded({ extended: true }));

    // Install routes
    this.app.use(new RootController(context).router);

    console.log('sjndsjd');

    this.server
      .on('listening', () => {
        console.log(`[AppServer] listening at port ${this.port}`);
      })
      .on('error', (error: NodeJS.ErrnoException) => {
        console.log(error.message);
        throw error;
      });
  }

  get port(): number {
    return this.context?.config?.settings?.server?.port;
  }

  start(): void {
    this.server.listen(
      this.context.config.settings.server.port,
      this.context.config.settings.server.hostName
    );
  }
}
