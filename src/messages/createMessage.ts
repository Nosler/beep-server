import {
  WSMatchMessage,
  WSMessageTypes,
  WSSignalMessage,
} from './messageTypes';

export function createSignalMessage(
  data: unknown,
  peerId: string,
): WSSignalMessage {
  return {
    type: WSMessageTypes.enum.SIGNAL,
    peerId,
    data,
  };
}

export function createMatchMessage(peerId: string, id: string): WSMatchMessage {
  return {
    type: WSMessageTypes.enum.MATCH,
    peerId,
    id,
  };
}
