import { Websocket } from 'hyper-express';
import { ListenMessage } from './messageTypes';
import { Connections } from '../types';

interface handleListenMessageArgs {
  id: string;
  ws?: Websocket;
  message?: ListenMessage;
  connections: Connections;
}

export function handleListenMessage({
  id,
  connections,
}: handleListenMessageArgs) {
  connections[id].open = true;
}
