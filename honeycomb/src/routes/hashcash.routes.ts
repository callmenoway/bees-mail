import { Router } from 'express';
import { generateHashcash, verifyHashcash } from '../lib/hashcash';

const router = Router();

router.post('/generate', (req, res) => {
  const { resource, bits = 20 } = req.body;
  
  if (!resource) {
    return res.status(400).json({ error: 'Resource is required' });
  }

  const stamp = generateHashcash(resource, bits);
  
  res.json({
    stamp,
    verified: verifyHashcash(stamp, bits),
    bits,
    computedAt: new Date().toISOString(),
  });
});

router.post('/verify', (req, res) => {
  const { stamp, requiredBits = 20 } = req.body;
  
  if (!stamp) {
    return res.status(400).json({ error: 'Stamp is required' });
  }

  res.json({
    verified: verifyHashcash(stamp, requiredBits),
    stamp,
  });
});

export default router;
