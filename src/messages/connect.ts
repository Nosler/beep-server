import { Websocket } from 'hyper-express';
import { ConnectMessage } from './messageTypes';
import { CROutgoingMessage, Connections, OutgoingMessageType } from '../types';

interface handleConnectMessageArgs {
  id: string;
  ws?: Websocket;
  message: ConnectMessage;
  connections: Connections;
}

export function handleConnectMessage({
  id,
  message,
  connections,
}: handleConnectMessageArgs) {
  if (!(message.id in connections) || !connections[message.id].open) {
    throw new Error('User not found');
  }
  connections[message.id].pending.push(id);

  const request: CROutgoingMessage = {
    id,
    type: OutgoingMessageType.CONNECT_REQUEST,
  };

  connections[message.id].ws.send(JSON.stringify(request));
}
