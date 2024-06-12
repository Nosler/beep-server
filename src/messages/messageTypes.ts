import z from 'zod';

export const WSMessageTypes = z.enum(['MATCH', 'SIGNAL', 'ID']);

export const ZWSMessage = z.object({
  type: WSMessageTypes,
});

export const ZWSIdMessage = ZWSMessage.extend({
  type: z.literal(WSMessageTypes.enum.ID),
  id: z.string(),
});

export const ZWSMatchMessage = ZWSMessage.extend({
  type: z.literal(WSMessageTypes.enum.MATCH),
  peerId: z.string(),
});

export const ZWSSignalMessage = ZWSMessage.extend({
  type: z.literal(WSMessageTypes.enum.SIGNAL),
  peerId: z.string(),
  id: z.string(),
  data: z.any(),
});

export type WSMessage = z.infer<typeof ZWSMessage>;
export type WSMatchMessage = z.infer<typeof ZWSMatchMessage>;
export type WSSignalMessage = z.infer<typeof ZWSSignalMessage>;
