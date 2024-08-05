import z from 'zod';

export const MessageTypes = z.enum(['MATCH', 'REQUEST', 'NEWID', 'CLICK', 'ERROR', 'LOGIN']);

export const ZMessage = z.object({
  type: MessageTypes,
});

export const ZNewIdMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.NEWID),
});

export const ZLoginMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.LOGIN),
  token: z.string(),
});

export const ZErrorMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.ERROR),
  error: z.string(),
  code: z.number(),
});

export const ZMatchMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.MATCH),
  peerId: z.string(),
  buttons: z.array(z.string()).min(1).max(9),
});

export const ZRequestMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.REQUEST),
  peerId: z.string(),
});

export const ZClickMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.CLICK),
  peerId: z.string(),
  buttonIndex: z.number(),
});

export type MessageTypes = z.infer<typeof MessageTypes>;
export type Message = z.infer<typeof ZMessage>;
export type NewIdMessage = z.infer<typeof ZNewIdMessage>;
export type MatchMessage = z.infer<typeof ZMatchMessage>;
export type ClickMessage = z.infer<typeof ZClickMessage>;
export type LoginMessage = z.infer<typeof ZLoginMessage>;
export type ErrorMessage = z.infer<typeof ZErrorMessage>;
export type RequestMessage = z.infer<typeof ZRequestMessage>;

export type ReceivableMessage =
  | MatchMessage
  | RequestMessage
  | NewIdMessage
  | ClickMessage
  | LoginMessage;

export type Out<T extends ReceivableMessage> = T | { id: string };
