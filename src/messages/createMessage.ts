import {
  Out,
  MatchMessage,
  MessageTypes,
  RequestMessage,
  ClickMessage,
  ErrorMessage,
} from './messageValidators';

export function createMatchMessage(from: string, to: string, buttons: string[]): Out<MatchMessage> {
  return {
    type: MessageTypes.enum.MATCH,
    id: to,
    peerId: from,
    buttons,
  };
}

export function createErrorMessage(error: string): ErrorMessage {
  return {
    type: MessageTypes.enum.ERROR,
    error,
  };
}

export function createRequestMessage(from: string, to: string): Out<RequestMessage> {
  return {
    type: MessageTypes.enum.REQUEST,
    peerId: to,
    id: from,
  };
}

export function createClickMessage(
  from: string,
  to: string,
  buttonIndex: number,
): Out<ClickMessage> {
  return {
    type: MessageTypes.enum.CLICK,
    id: to,
    peerId: from,
    buttonIndex,
  };
}
