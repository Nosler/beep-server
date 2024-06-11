import type { Websocket } from 'hyper-express';

export interface Connection {
  ws: Websocket;
  open?: boolean;
  pending: string[];
  allowed: string[];
}

export interface Connections {
  [id: string]: Connection;
}

export const enum OutgoingMessageType {
  CONNECT_REQUEST,
  REQUEST_ACCEPTED,
  REQUEST_DENIED,
}

export interface OutgoingMessage {
  type: OutgoingMessageType;
}

export interface CROutgoingMessage extends OutgoingMessage {
  id: string;
}
