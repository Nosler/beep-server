import { Out, WSMatchMessage, WSMessageTypes } from './messageTypes';

export function createMatchMessage(
  id: string,
  peerId: string,
): Out<WSMatchMessage> {
  return {
    type: WSMessageTypes.enum.MATCH,
    peerId,
    id,
  };
}
