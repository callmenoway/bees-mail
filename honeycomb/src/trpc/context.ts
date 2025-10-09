import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { verifyToken } from '../lib/jwt';

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const authHeader = req.headers.authorization;
  let userAddress: string | null = null;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (payload) {
      userAddress = payload.address;
    }
  }

  return {
    req,
    res,
    userAddress,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
