import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/),
  domain: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  address: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]+~[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid Honeycomb address format'
    ),
  password: z.string(),
});
