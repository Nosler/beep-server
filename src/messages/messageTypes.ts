import z from 'zod';

export const MessageType = z.enum(['LISTEN', 'CONNECT']);

export const ZMessage = z.object({
  type: MessageType,
});

export const ZListenMessage = ZMessage.extend({
  type: z.literal(MessageType.enum.LISTEN),
});

export const ZConnectMessage = ZMessage.extend({
  type: z.literal(MessageType.enum.CONNECT),
  id: z.string(),
});

export type Message = z.infer<typeof ZMessage>;
export type ListenMessage = z.infer<typeof ZListenMessage>;
export type ConnectMessage = z.infer<typeof ZConnectMessage>;
