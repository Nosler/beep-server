import { Websocket } from 'hyper-express';
import { Connections, CurrentConnectionData } from '../types';
import { init } from '@paralleldrive/cuid2';
import { deleteConnection, newConnection } from '../connect';
import jwt from 'jsonwebtoken';
import { EnvironmentError } from '../errors';

interface handleNewIdMessageArgs {
  ctx: CurrentConnectionData;
  ws: Websocket;
  connections: Connections;
}

const cuid = init({
  length: 8,
});

export const handleNewIdMessage = ({ ctx, ws, connections }: handleNewIdMessageArgs) => {
  const userData = ctx.id ? connections[ctx.id] : newConnection(ws);

  if (ctx.id) {
    deleteConnection(connections, ctx.id as string);
  }

  const id = cuid();
  ctx.id = id;

  connections[id] = userData;

  const secret = process.env.JWT_SECRET as string | undefined;
  if (!secret) {
    throw new EnvironmentError('JWT_SECRET');
  }

  const token = jwt.sign({ id }, secret as string, { expiresIn: '7d' });

  const out = { type: 'ID', token };
  ws.send(JSON.stringify(out));
};
