import { Websocket } from 'hyper-express';
import { WSMessageTypes, WSSignalMessage } from './messageTypes';
import { Connections } from '../types';

interface handleSignalMessageArgs {
  id: string;
  ws?: Websocket;
  message: WSSignalMessage;
  connections: Connections;
}

export function handleSignalMessage({
  id,
  message,
  connections,
}: handleSignalMessageArgs) {
  if (!(message.id in connections)) {
    throw new Error('User not found');
  }
  if (connections[message.id].pending) {
    throw new Error('User is busy');
  }

  connections[message.id].pending = id;

  const request: WSSignalMessage = {
    id,
    type: WSMessageTypes.enum.SIGNAL,
  };

  connections[message.id].ws.send(JSON.stringify(request));
}
