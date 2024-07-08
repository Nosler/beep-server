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
        console.error(`[ERROR]: ${id}`, e?.message);
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
