import { Websocket } from 'hyper-express';
import { Connections } from '../types';
import {
  ZMessage,
  MessageType,
  ZListenMessage,
  ZConnectMessage,
} from './messageTypes';
import { handleListenMessage } from './listen';
import { handleConnectMessage } from './connect';

interface HandleMessageArgs {
  id: string;
  ws: Websocket;
  data: unknown;
  connections: Connections;
}

export function handleMessage(props: HandleMessageArgs) {
  const message = ZMessage.passthrough().parse(props.data);

  switch (message.type) {
    case MessageType.enum.LISTEN:
      handleListenMessage({
        ...props,
        message: ZListenMessage.parse(message),
      });
      break;
    case MessageType.enum.CONNECT:
      handleConnectMessage({
        ...props,
        message: ZConnectMessage.parse(message),
      });
      break;
  }
}
