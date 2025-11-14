import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const router = Router();

// Generate hashcash challenge
router.get('/challenge', authMiddleware, (req: AuthRequest, res) => {
  try {
    const challenge = crypto.randomBytes(16).toString('hex');
    const difficulty = 4;

    res.json({
      challenge,
      difficulty,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Verify hashcash proof of work
router.post('/verify', authMiddleware, (req: AuthRequest, res) => {
  try {
    const { challenge, nonce } = req.body;

    if (!challenge || !nonce) {
      return res.status(400).json({ error: 'Challenge and nonce required' });
    }

    const hash = crypto
      .createHash('sha256')
      .update(challenge + nonce)
      .digest('hex');

    const difficulty = 4;
    const valid = hash.startsWith('0'.repeat(difficulty));

    if (valid) {
      res.json({ valid: true, hash });
    } else {
      res.status(400).json({ valid: false, error: 'Invalid proof of work', hash });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
