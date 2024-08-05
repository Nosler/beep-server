import dotenv from 'dotenv';
dotenv.config();

import HyperExpress from 'hyper-express';
import type { Connections, CurrentConnectionData } from './types';
import { handleMessage } from './messages';
import { createErrorMessage } from './messages/createMessage';
import Logger from 'js-logger';
import { disconnectUser } from './connect';
import { BeepError } from './errors';

const app = new HyperExpress.Server();
const PORT = +(process.env.PORT || '3000');

const connections: Connections = {};

app.get('/', (_, res) => {
  res.redirect('https://github.com/Nosler/beep');
});

app.get('/livez', (_, res) => {
  res.send('Hey ;3');
});

app.ws('/connect', (ws) => {
  Logger.info('New WS connection');
  const ctx: CurrentConnectionData = { id: undefined };

  ws.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    Logger.debug('Received message:', data);
    try {
      handleMessage({ ctx, ws, data, connections });
    } catch (e) {
      if (e instanceof BeepError) {
        ws.send(JSON.stringify(createErrorMessage(e.message, e.code)));
      } else {
        Logger.error(e);
      }
    }
  });

  ws.on('close', () => {
    if (ctx.id) {
      disconnectUser(connections, ctx.id);
    }
  });
});

app.listen(PORT, () => {
  Logger.info('Server is running on port', PORT);
});

process.on('uncaughtException', (err) => {
  Logger.error('There was an uncaught error', err);
  process.exit(1);
});

const shutdown = () => {
  Logger.info('Shutting down server');
  app.close();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
