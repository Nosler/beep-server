import { Websocket } from 'hyper-express';
import { RequestMessage } from './messageValidators';
import { Connections } from '../types';
import { requestListen } from '../connect';

interface handleRequestMessageArgs {
  id: string;
  ws?: Websocket;
  message: RequestMessage;
  connections: Connections;
}

export function handleRequestMessage({
  id,
  connections,
  message,
}: handleRequestMessageArgs) {
  const peerId = message.peerId;
  if (peerId === id) {
    throw new Error("You don't need us to connect to yourself :)");
  }
  if (!(peerId in connections)) {
    throw new Error(`Peer ${peerId} not found.`);
  }
  if (connections[id].requested) {
    throw new Error('You already have a pending request.');
  }
  if (
    id in connections[peerId].senders ||
    peerId in connections[id].listeners
  ) {
    throw new Error('Already connected to this peer.');
  }
  requestListen(connections, id, peerId);
}
