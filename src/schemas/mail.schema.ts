import { z } from 'zod';

// Custom validator for Honeycomb address format (user~domain.com)
const honeycombAddressSchema = z.string().regex(
  /^[a-zA-Z0-9_-]+~[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  'Invalid Honeycomb address format. Must be: username~domain.com'
);

export const contentSchema = z.object({
  type: z.enum(['markdown', 'html', 'plain']),
  body: z.string(),
  renderedHtml: z.string().optional(),
  plainText: z.string().optional(),
});

export const attachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  size: z.number(),
  mimeType: z.string(),
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
  isInline: z.boolean(),
  virusScanned: z.boolean(),
  compressed: z.boolean(),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
  }).optional(),
});

export const pollOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  votes: z.array(z.string()),
});

export const pollSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(pollOptionSchema),
  multipleChoice: z.boolean(),
  anonymous: z.boolean(),
  closesAt: z.string().datetime().optional(),
  totalVotes: z.number(),
});

export const internalNoteSchema = z.object({
  id: z.string(),
  author: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
});

export const collaborativeSchema = z.object({
  assignedTo: z.array(honeycombAddressSchema),
  internalNotes: z.array(internalNoteSchema),
  tags: z.array(z.string()),
  status: z.enum(['to-do', 'in_progress', 'done']),
});

export const hashcashSchema = z.object({
  stamp: z.string(),
  bits: z.number(),
  verified: z.boolean().optional(),
  computedAt: z.string().datetime(),
});

export const ephemeralSchema = z.object({
  enabled: z.boolean(),
  expiresAt: z.string().datetime().optional(),
  maxReads: z.number().optional(),
  readsCount: z.number().default(0),
});

export const scheduledSchema = z.object({
  enabled: z.boolean(),
  sendAt: z.string().datetime().optional(),
  recurring: z.string().optional(),
  timezone: z.string().default('UTC'),
});

export const metadataSchema = z.object({
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  labels: z.array(z.string()).default([]),
  readReceipt: z.boolean().default(false),
  ephemeral: ephemeralSchema.optional(),
  scheduled: scheduledSchema.optional(),
  hashcash: hashcashSchema,
  tracking: z.object({
    openedBy: z.array(z.string()).default([]),
    openedAt: z.record(z.string().datetime()).default({}),
    clickedLinks: z.array(z.string()).default([]),
  }).default({}),
});

export const sendMailSchema = z.object({
  to: z.array(honeycombAddressSchema), // 👈 Cambiato da email() a honeycombAddressSchema
  cc: z.array(honeycombAddressSchema).optional(), // 👈 Cambiato
  bcc: z.array(honeycombAddressSchema).optional(), // 👈 Cambiato
  subject: z.string().min(1).max(500),
  content: contentSchema,
  attachments: z.array(attachmentSchema).optional(),
  poll: pollSchema.optional(),
  collaborative: collaborativeSchema.optional(),
  metadata: metadataSchema,
});

export const reactionSchema = z.object({
  mailId: z.string(),
  emoji: z.string().emoji(),
});
