import type { Websocket } from 'hyper-express';

export interface CurrentConnectionData {
  id?: string;
}

export interface Connection {
  ws?: Websocket;
  /**
   * Sources of messages.
   */
  senders: string[];
  /**
   * Destinations of messages
   */
  listeners: string[];
  /**
   * The currently awaited connection.
   */
  requested?: string;
  /**
   * The currently pending connection for a listener.
   */
  pending?: string;
  /**
   * Senders always have to connect to listeners.
   */
  pendingQueue: string[];
}

export interface Connections {
  [id: string]: Connection;
}
