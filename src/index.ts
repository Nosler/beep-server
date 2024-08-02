import dotenv from 'dotenv';
dotenv.config();

import HyperExpress from 'hyper-express';
import type { Connections } from './types';
import { handleMessage } from './messages';
import { newConnection } from './connect';
import { createErrorMessage } from './messages/createMessage';

const app = new HyperExpress.Server();
const PORT = +(process.env.PORT || '3000');

const connections: Connections = {};

app.get('/', (_, res) => {
  res.redirect('github.com/Nosler/beep')
});

app.get('/livez', (_, res) => {
  res.send('Hey ;3');
})

app.ws('/connect', (ws) => {
  console.log('New WS connection');

  const id = Math.random().toString(36).slice(2, 9);
  ws.send(JSON.stringify({ type: 'ID', id }));

  connections[id] = newConnection(ws);

  console.log('Client ID:', id);

  ws.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    console.log('Received message:', data);
    try {
      handleMessage({ id, ws, data, connections });
    } catch (e) {
      if (e instanceof Error) {
        console.error(`[ERROR]: ${id}\n` + e?.message);
        ws.send(JSON.stringify(createErrorMessage(e.message)));
      } else {
        console.error(e);
      }
    }
  });

  ws.on('close', () => {
    delete connections[id];
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1);
});

const shutdown = () => {
  console.log('Shutting down server');
  app.close();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
