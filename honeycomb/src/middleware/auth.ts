import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

export interface AuthRequest extends Request {
  userAddress?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  // Cerca il token in vari modi
  let token = req.headers['x-auth-token'] as string || // Header custom x-auth-token
            req.headers['token'] as string || // Header custom token
            req.query.token as string; // Query param ?token=xxx
  
  // Se non trovato, prova con Authorization Bearer
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    return res.status(401).json({ error: 'Missing token. Provide via headers (token, x-auth-token, Authorization: Bearer) or query param (?token=xxx)' });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userAddress = payload.address;
  next();
}
