import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { marked } from 'marked';
import { router, protectedProcedure } from '../trpc';
import { sendMailSchema, reactionSchema } from '../../schemas/mail.schema';
import { prisma } from '../../lib/prisma';
import { verifyHashcash } from '../../lib/hashcash';

export const mailRouter = router({
  send: protectedProcedure
    .input(sendMailSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify hashcash
      const isSpam = !verifyHashcash(
        input.metadata.hashcash.stamp,
        input.metadata.hashcash.bits
      );

      // Render markdown if needed
      let renderedHtml = input.content.body;
      if (input.content.type === 'markdown') {
        renderedHtml = await marked(input.content.body);
      }

      const content = {
        ...input.content,
        renderedHtml,
        plainText: input.content.body.replace(/<[^>]*>/g, ''),
      };

      const now = new Date();
      const shouldSchedule = input.metadata.scheduled?.enabled;

      const mail = await prisma.mail.create({
        data: {
          fromAddress: ctx.userAddress,
          subject: input.subject,
          content: content as any,
          attachments: input.attachments as any,
          reactions: {},
          poll: input.poll as any,
          collaborative: input.collaborative as any,
          metadata: {
            ...input.metadata,
            hashcash: {
              ...input.metadata.hashcash,
              verified: !isSpam,
            },
          } as any,
          sentAt: shouldSchedule ? null : now,
          isSpam,
          recipients: {
            create: [
              ...input.to.map(addr => ({ recipientAddress: addr, type: 'to' })),
              ...(input.cc || []).map(addr => ({ recipientAddress: addr, type: 'cc' })),
              ...(input.bcc || []).map(addr => ({ recipientAddress: addr, type: 'bcc' })),
            ],
          },
        },
        include: {
          recipients: true,
        },
      });

      return mail;
    }),

  inbox: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      const mails = await prisma.mail.findMany({
        where: {
          recipients: {
            some: { recipientAddress: ctx.userAddress },
          },
          isArchived: false,
          isSpam: false,
        },
        include: {
          recipients: true,
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit,
        skip: input.offset,
      });

      const total = await prisma.mail.count({
        where: {
          recipients: {
            some: { recipientAddress: ctx.userAddress },
          },
          isArchived: false,
          isSpam: false,
        },
      });

      return { mails, total };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const mail = await prisma.mail.findUnique({
        where: { id: input.id },
        include: { recipients: true },
      });

      if (!mail) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Mail not found',
        });
      }

      return mail;
    }),

  addReaction: protectedProcedure
    .input(reactionSchema)
    .mutation(async ({ ctx, input }) => {
      const mail = await prisma.mail.findUnique({
        where: { id: input.mailId },
      });

      if (!mail) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Mail not found',
        });
      }

      const reactions = (mail.reactions as any) || {};
      if (!reactions[input.emoji]) reactions[input.emoji] = [];

      if (!reactions[input.emoji].includes(ctx.userAddress)) {
        reactions[input.emoji].push(ctx.userAddress);
      }

      const updated = await prisma.mail.update({
        where: { id: input.mailId },
        data: { reactions: reactions as any },
      });

      return updated;
    }),

  removeReaction: protectedProcedure
    .input(reactionSchema)
    .mutation(async ({ ctx, input }) => {
      const mail = await prisma.mail.findUnique({
        where: { id: input.mailId },
      });

      if (!mail) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Mail not found',
        });
      }

      const reactions = (mail.reactions as any) || {};
      if (reactions[input.emoji]) {
        reactions[input.emoji] = reactions[input.emoji].filter(
          (addr: string) => addr !== ctx.userAddress
        );
      }

      const updated = await prisma.mail.update({
        where: { id: input.mailId },
        data: { reactions: reactions as any },
      });

      return updated;
    }),
});
