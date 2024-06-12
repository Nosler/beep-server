import { Websocket } from 'hyper-express';
import { WSMatchMessage } from './messageTypes';
import { Connections } from '../types';

interface handleMatchMessageArgs {
  id: string;
  ws?: Websocket;
  message?: WSMatchMessage;
  connections: Connections;
}

export function handleMatchMessage({
  id,
  connections,
}: handleMatchMessageArgs) {
  //connections[id].open = true;
}
