import { Router } from 'express';
import { marked } from 'marked';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { sendMailSchema } from '../schemas/mail.schema';
import { verifyHashcash } from '../lib/hashcash';

const router = Router();

router.use(authMiddleware);

router.post('/send', async (req: AuthRequest, res) => {
  try {
    const mailData = sendMailSchema.parse(req.body);
    
    const isSpam = !verifyHashcash(
      mailData.metadata.hashcash.stamp,
      mailData.metadata.hashcash.bits
    );

    let renderedHtml = mailData.content.body;
    if (mailData.content.type === 'markdown') {
      renderedHtml = await marked(mailData.content.body);
    }

    const content = {
      ...mailData.content,
      renderedHtml,
      plainText: mailData.content.body.replace(/<[^>]*>/g, ''),
    };

    const now = new Date();
    const shouldSchedule = mailData.metadata.scheduled?.enabled;

    const mail = await prisma.mail.create({
      data: {
        fromAddress: req.userAddress!,
        subject: mailData.subject,
        content: content as any,
        attachments: mailData.attachments as any,
        reactions: {},
        poll: mailData.poll as any,
        collaborative: mailData.collaborative as any,
        metadata: {
          ...mailData.metadata,
          hashcash: {
            ...mailData.metadata.hashcash,
            verified: !isSpam,
          },
        } as any,
        sentAt: shouldSchedule ? null : now,
        isSpam,
        recipients: {
          create: [
            ...mailData.to.map(addr => ({ recipientAddress: addr, type: 'to' })),
            ...(mailData.cc || []).map(addr => ({ recipientAddress: addr, type: 'cc' })),
            ...(mailData.bcc || []).map(addr => ({ recipientAddress: addr, type: 'bcc' })),
          ],
        },
      },
      include: {
        recipients: true,
      },
    });

    res.status(201).json(mail);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/inbox', async (req: AuthRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const mails = await prisma.mail.findMany({
      where: {
        recipients: {
          some: { recipientAddress: req.userAddress },
        },
        isArchived: false,
        // RIMUOVO IL FILTRO isSpam per vedere anche le mail spam
      },
      include: {
        recipients: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.mail.count({
      where: {
        recipients: {
          some: { recipientAddress: req.userAddress },
        },
        isArchived: false,
      },
    });

    res.json({ mails, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AGGIUNGO ENDPOINT PER LO SPAM
router.get('/spam', async (req: AuthRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const mails = await prisma.mail.findMany({
      where: {
        recipients: {
          some: { recipientAddress: req.userAddress },
        },
        isSpam: true,
      },
      include: {
        recipients: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.mail.count({
      where: {
        recipients: {
          some: { recipientAddress: req.userAddress },
        },
        isSpam: true,
      },
    });

    res.json({ mails, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AGGIUNGO ENDPOINT PER LE MAIL INVIATE
router.get('/sent', async (req: AuthRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const mails = await prisma.mail.findMany({
      where: {
        fromAddress: req.userAddress, // <-- Cerca per mittente!
        isArchived: false,
      },
      include: {
        recipients: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.mail.count({
      where: {
        fromAddress: req.userAddress,
        isArchived: false,
      },
    });

    res.json({ mails, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const mail = await prisma.mail.findUnique({
      where: { id: req.params.id },
      include: { recipients: true },
    });

    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' });
    }

    res.json(mail);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/reaction', async (req: AuthRequest, res) => {
  try {
    const { emoji } = req.body;
    
    const mail = await prisma.mail.findUnique({
      where: { id: req.params.id },
    });

    if (!mail) {
      return res.status(404).json({ error: 'Mail not found' });
    }

    const reactions = (mail.reactions as any) || {};
    if (!reactions[emoji]) reactions[emoji] = [];

    if (!reactions[emoji].includes(req.userAddress)) {
      reactions[emoji].push(req.userAddress);
    }

    const updated = await prisma.mail.update({
      where: { id: req.params.id },
      data: { reactions: reactions as any },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
