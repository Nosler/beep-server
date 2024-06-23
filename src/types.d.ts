import type { Websocket } from 'hyper-express';

export interface Connection {
  ws: Websocket;
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
   * The currently pending connection.
   * // TODO: Might have to work with race conditions if moving to multiple threads.
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
