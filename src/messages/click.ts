import { Websocket } from 'hyper-express';
import { ClickMessage } from './messageValidators';
import { Connections } from '../types';
import { createClickMessage } from './createMessage';

interface handleClickMessageArgs {
  id: string;
  ws?: Websocket;
  message: ClickMessage;
  connections: Connections;
}

export function handleClickMessage({ id, message, connections }: handleClickMessageArgs) {
  const peerId = message.peerId;
  if (!(peerId in connections[id].listeners)) {
    throw new Error('Peer not listening!');
  }
  if (!(peerId in connections)) {
    throw new Error('Peer not connected!');
  }
  const out = createClickMessage(id, peerId, message.button);
  connections[peerId].ws.send(JSON.stringify(out));
}
