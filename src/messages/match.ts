import { Websocket } from 'hyper-express';
import { MatchMessage } from './messageValidators';
import { Connections } from '../types';
import { createMatchMessage } from './createMessage';

interface handleMatchMessageArgs {
  id: string;
  ws?: Websocket;
  message: MatchMessage;
  connections: Connections;
}

export function handleMatchMessage({
  id,
  connections,
  message,
}: handleMatchMessageArgs) {
  const peerId = message.peerId;
  if (!(peerId in connections)) {
    throw new Error(`Peer ${peerId} not found.`);
  }

  const peer = connections[peerId];
  const out = createMatchMessage(id, peerId);
  peer.ws.send(JSON.stringify(out));
}
