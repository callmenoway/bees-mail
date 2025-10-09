import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Testing database connection...');
  
  try {
    await prisma.$connect();
    console.log('✅ Connected to database!');
    
    const userCount = await prisma.user.count();
    console.log(`📊 Users in database: ${userCount}`);
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
