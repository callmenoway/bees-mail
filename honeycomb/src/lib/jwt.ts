import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(address: string): string {
  return jwt.sign({ address }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { address: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { address: string };
  } catch {
    return null;
  }
}
