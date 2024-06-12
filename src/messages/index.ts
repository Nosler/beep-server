import { Websocket } from 'hyper-express';
import { Connections } from '../types';
import {
  ZWSMessage,
  WSMessageTypes,
  ZWSMatchMessage,
  ZWSSignalMessage,
} from './messageTypes';
import { handleMatchMessage } from './match';
import { handleSignalMessage } from './signal';

interface HandleMessageArgs {
  id: string;
  ws: Websocket;
  data: unknown;
  connections: Connections;
}

export function handleMessage(props: HandleMessageArgs) {
  const message = ZWSMessage.passthrough().parse(props.data);

  switch (message.type) {
    case WSMessageTypes.enum.MATCH:
      handleMatchMessage({
        ...props,
        message: ZWSMatchMessage.parse(message),
      });
      break;
    case WSMessageTypes.enum.SIGNAL:
      handleSignalMessage({
        ...props,
        message: ZWSSignalMessage.parse(message),
      });
      break;
  }
}
