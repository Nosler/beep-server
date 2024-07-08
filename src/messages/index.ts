import { Websocket } from 'hyper-express';
import { Connections } from '../types';
import {
  ZMessage,
  MessageTypes,
  ZMatchMessage,
  ZRequestMessage,
  ZClickMessage,
} from './messageValidators';
import { handleMatchMessage } from './match';
import { handleRequestMessage } from './request';
import { handleClickMessage } from './click';

interface HandleMessageArgs {
  id: string;
  ws: Websocket;
  data: unknown;
  connections: Connections;
}

export function handleMessage(props: HandleMessageArgs) {
  const message = ZMessage.passthrough().parse(props.data);

  switch (message.type) {
    case MessageTypes.enum.REQUEST:
      handleRequestMessage({
        ...props,
        message: ZRequestMessage.parse(message),
      });
      break;
    case MessageTypes.enum.MATCH:
      handleMatchMessage({
        ...props,
        message: ZMatchMessage.parse(message),
      });
      break;
    case MessageTypes.enum.CLICK:
      handleClickMessage({
        ...props,
        message: ZClickMessage.parse(message),
      });
  }
}
