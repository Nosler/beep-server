import type { Websocket } from 'hyper-express';

export interface Connection {
  ws: Websocket;
  pending?: string;
}

export interface Connections {
  [id: string]: Connection;
}
