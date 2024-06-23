import {
  Out,
  MatchMessage,
  MessageTypes,
  RequestMessage,
} from './messageValidators';

export function createMatchMessage(
  from: string,
  to: string,
): Out<MatchMessage> {
  return {
    type: MessageTypes.enum.MATCH,
    peerId: to,
    id: from,
  };
}

export function createRequestMessage(
  from: string,
  to: string,
): Out<RequestMessage> {
  return {
    type: MessageTypes.enum.REQUEST,
    peerId: to,
    id: from,
  };
}
