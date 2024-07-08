import { createRequestMessage } from './messages/createMessage';
import { Connection, Connections } from './types';
import { Websocket } from 'hyper-express';

export function requestListen(
  connections: Connections,
  from: string,
  to: string,
) {
  connections[to].pendingQueue.push(from);
  getNext(connections, to);
}

function getNext(connections: Connections, id: string) {
  const connection = connections[id];
  if (connection.pending || connection.pendingQueue.length === 0) {
    return;
  }

  const nextId = connection.pendingQueue.shift() as string;
  connection.pending = nextId;
  connection.ws.send(JSON.stringify(createRequestMessage(nextId, id)));
}

export function match(connections: Connections, from: string, to: string) {
  const connection = connections[from];
  if (connection.pending !== to) {
    throw new Error('Id not pending.');
  }

  connection.senders.push(to);
  connection.pending = undefined;
  connections[to].listeners.push(from);

  getNext(connections, from);
}

export function rejectListen(
  connections: Connections,
  from: string,
  to: string,
) {
  const connection = connections[to];
  if (connection.pending === from) {
    connection.pending = undefined;
    getNext(connections, to);
  }
}

export const newConnection = (ws: Websocket): Connection => ({
  ws,
  listeners: [],
  pendingQueue: [],
  senders: [],
});