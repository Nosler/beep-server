import z from 'zod';

export const MessageTypes = z.enum(['MATCH', 'REQUEST', 'ID']);

export const ZMessage = z.object({
  type: MessageTypes,
});

export const ZIdMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.ID),
});

export const ZMatchMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.MATCH),
  peerId: z.string(),
});

export const ZRequestMessage = ZMessage.extend({
  type: z.literal(MessageTypes.enum.REQUEST),
  peerId: z.string(),
});

export type MessageTypes = z.infer<typeof MessageTypes>;
export type Message = z.infer<typeof ZMessage>;
export type IdMessage = z.infer<typeof ZIdMessage>;
export type MatchMessage = z.infer<typeof ZMatchMessage>;
export type RequestMessage = z.infer<typeof ZRequestMessage>;

export type ReceivableMessage = MatchMessage | RequestMessage;
export type Out<T extends ReceivableMessage> = T | { id: string };
