import { Websocket } from 'hyper-express';
import { Connections, CurrentConnectionData } from '../types';
import { LoginMessage } from './messageValidators';
import jwt from 'jsonwebtoken';
import { EnvironmentError, InvalidTokenError, UserNotFoundError } from '../errors';

interface handleLoginMessageArgs {
  ctx: CurrentConnectionData;
  ws: Websocket;
  connections: Connections;
  message: LoginMessage;
}

export const handleLoginMessage = ({ ctx, ws, connections, message }: handleLoginMessageArgs) => {
  const secret = process.env.JWT_SECRET as string | undefined;
  if (!secret) {
    throw new EnvironmentError('JWT_SECRET');
  }
  const token = message.token;
  let id: string;
  try {
    const payload = jwt.verify(token, secret) as { id: string };
    id = payload.id;
  } catch (e) {
    throw new InvalidTokenError();
  }

  if (!connections[id]) {
    throw new InvalidTokenError(id);
  }

  ctx.id = id;
  connections[id].ws = ws;

  const out = { type: 'ID', id, token };
  ws.send(JSON.stringify(out));
};
