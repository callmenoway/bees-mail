import crypto from 'crypto';

export function generateHashcash(resource: string, bits: number = 20): string {
  const version = 1;
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const extension = '';
  let counter = 0;

  while (true) {
    const stamp = `${version}:${bits}:${date}:${resource}:${extension}:${randomString(16)}${counter}`;
    if (verifyHashcash(stamp, bits)) {
      return stamp;
    }
    counter++;
  }
}

export function verifyHashcash(stamp: string, requiredBits: number): boolean {
  const parts = stamp.split(':');
  if (parts.length !== 6) return false;

  const bits = parseInt(parts[1]);
  if (bits < requiredBits) return false;

  const hash = crypto.createHash('sha1').update(stamp).digest('hex');
  const requiredZeros = Math.floor(requiredBits / 4);

  for (let i = 0; i < requiredZeros; i++) {
    if (hash[i] !== '0') return false;
  }

  return true;
}

function randomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}
