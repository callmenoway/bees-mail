import { Router } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { generateToken } from '../lib/jwt';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const address = `${data.username}~${data.domain}`;
    
    const existing = await prisma.user.findUnique({ where: { address } });
    if (existing) {
      return res.status(409).json({ error: 'Address already exists' });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        address,
        username: data.username,
        domain: data.domain,
        passwordHash,
      },
      select: {
        id: true,
        address: true,
        username: true,
        domain: true,
        storageUsed: true,
        storageLimit: true,
        createdAt: true,
        isActive: true,
      },
    });

    const token = generateToken(user.address);

    res.status(201).json({ token, user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { address: data.address },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const token = generateToken(user.address);

    res.json({
      token,
      user: {
        id: user.id,
        address: user.address,
        username: user.username,
        domain: user.domain,
        storageUsed: user.storageUsed,
        storageLimit: user.storageLimit,
        createdAt: user.createdAt,
        isActive: user.isActive,
      },
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
