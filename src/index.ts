import dotenv from 'dotenv';
dotenv.config();

import HyperExpress from 'hyper-express';
import type { Connections } from './types';
import { handleMessage } from './messages';

const app = new HyperExpress.Server();
const PORT = +process.env.PORT || 3000;

const connections: Connections = {};

app.ws('/connect', (ws) => {
  console.log('New WS connection');

  const id = Math.random().toString(36).slice(2, 9);
  ws.send(JSON.stringify({ type: 'ID', id }));

  connections[id] = { ws };

  console.log('Client ID:', id);

  ws.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    console.log('Received message:', data);
    try {
      handleMessage({ id, ws, data, connections });
    } catch (e) {
      console.error(`[ERROR]: ${id}`, e.message);
      ws.send(JSON.stringify({ type: 'ERROR', error: e.message }));
    }
  });

  ws.on('close', () => {
    delete connections[id];
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
