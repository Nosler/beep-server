import { Websocket } from 'hyper-express';
import { MatchMessage } from './messageValidators';
import { Connections } from '../types';
import { createMatchMessage } from './createMessage';
import { match } from '../connect';

interface handleMatchMessageArgs {
  id: string;
  ws?: Websocket;
  message: MatchMessage;
  connections: Connections;
}

export function handleMatchMessage({
  id,
  message,
  connections,
}: handleMatchMessageArgs) {
  const peerId = message.peerId;
  const out = createMatchMessage(id, peerId, message.buttons);
  match(connections, id, peerId);
  connections[peerId].ws.send(JSON.stringify(out));
}
