import Logger from 'js-logger';
import { InvalidDataError, PeerDisconnectedError } from './errors';
import { createRequestMessage } from './messages/createMessage';
import { Connection, Connections } from './types';
import { Websocket } from 'hyper-express';

export function requestListen(connections: Connections, from: string, to: string) {
  if (!connections[to]) {
    throw new PeerDisconnectedError('Peer not found.');
  }
  Logger.debug('Requesting listen: \n', connections[to]);
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
  connection.ws!.send(JSON.stringify(createRequestMessage(nextId, id)));
}

export function match(connections: Connections, listener: string, sender: string) {
  const connection = connections[listener];

  if (sender in connection.listeners) {
    // if updating sounds
    return;
  }

  if (connection.pending !== sender) {
    throw new InvalidDataError('Id not pending.');
  }

  connection.senders.push(sender);
  connection.pending = undefined;
  connections[sender].listeners.push(listener);

  getNext(connections, listener);
}

export function rejectListen(connections: Connections, from: string, to: string) {
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

export const deleteConnection = (connections: Connections, id: string) => {
  for (const senderId of connections[id].senders) {
    connections[senderId].listeners = connections[senderId].listeners.filter((lid) => lid !== id);
  }
  for (const listenerId of connections[id].listeners) {
    connections[listenerId].senders = connections[listenerId].senders.filter((sid) => sid !== id);
  }
  delete connections[id];
};

export const disconnectUser = (connections: Connections, id: string) => {
  const user = connections[id];
  for (const nextId of [...user.pendingQueue, user.pending]) {
    if (nextId) {
      connections[nextId].ws?.send(JSON.stringify({ type: 'Error', message: 'Peer not found.' }));
    }
  }
  user.pendingQueue = [];
  user.pending = undefined;
  user.ws = undefined;
};
