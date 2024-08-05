import { Websocket } from 'hyper-express';
import { Connections, CurrentConnectionData } from '../types';
import {
  ZMessage,
  MessageTypes,
  ZMatchMessage,
  ZRequestMessage,
  ZClickMessage,
  ZLoginMessage,
} from './messageValidators';
import { handleMatchMessage } from './match';
import { handleRequestMessage } from './request';
import { handleClickMessage } from './click';
import { handleNewIdMessage } from './newId';
import { handleLoginMessage } from './login';
import { NotConnectedError } from '../errors';

interface HandleMessageArgs {
  ctx: CurrentConnectionData;
  ws: Websocket;
  data: unknown;
  connections: Connections;
}

export function handleMessage(props: HandleMessageArgs) {
  const message = ZMessage.passthrough().parse(props.data);

  if (message.type === MessageTypes.enum.NEWID) {
    handleNewIdMessage({
      ...props,
    });
  }

  if (message.type === MessageTypes.enum.LOGIN) {
    handleLoginMessage({
      ...props,
      message: ZLoginMessage.parse(message),
    });
  }

  if (!props.ctx.id) {
    throw new NotConnectedError();
  }

  const id = props.ctx.id as string;

  switch (message.type) {
    case MessageTypes.enum.REQUEST:
      handleRequestMessage({
        ws: props.ws,
        connections: props.connections,
        id,
        message: ZRequestMessage.parse(message),
      });
      break;
    case MessageTypes.enum.MATCH:
      handleMatchMessage({
        ws: props.ws,
        connections: props.connections,
        id,
        message: ZMatchMessage.parse(message),
      });
      break;
    case MessageTypes.enum.CLICK:
      handleClickMessage({
        ws: props.ws,
        connections: props.connections,
        id,
        message: ZClickMessage.parse(message),
      });
  }
}
