import dotenv from 'dotenv';
dotenv.config();

import HyperExpress from 'hyper-express';
import WebSocket, { WebSocketServer } from 'ws';

const app = new HyperExpress.Server();
const PORT = +process.env.PORT || 3000;

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log('WS Received: ', data);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.listen(PORT);
