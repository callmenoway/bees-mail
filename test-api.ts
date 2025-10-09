import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:8080/trpc';

async function testAPI() {
  console.log('🧪 Testing Honeycomb Protocol API\n');

  try {
    // 1. Register
    console.log('1️⃣ Registering user...');
    const registerRes = await fetch(`${BASE_URL}/auth.register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        domain: 'beesmail.com',
        password: 'password123',
      }),
    });
    const registerData = await registerRes.json();
    console.log('✅ User registered:', registerData.result.data.user.address);
    const token = registerData.result.data.token;
    console.log('🔑 Token:', token.substring(0, 20) + '...\n');

    // 2. Generate Hashcash
    console.log('2️⃣ Generating hashcash...');
    const hashRes = await fetch(`${BASE_URL}/hashcash.generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resource: 'testuser~beesmail.com',
        bits: 20,
      }),
    });
    const hashData = await hashRes.json();
    const stamp = hashData.result.data.stamp;
    console.log('✅ Hashcash stamp:', stamp, '\n');

    // 3. Send Mail
    console.log('3️⃣ Sending mail...');
    const mailRes = await fetch(`${BASE_URL}/mail.send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: ['recipient~beesmail.com'],
        subject: 'Test Mail from Honeycomb 🐝',
        content: {
          type: 'markdown',
          body: '# Hello!\n\nThis is a **test** mail.',
        },
        metadata: {
          priority: 'high',
          hashcash: {
            stamp: stamp,
            bits: 20,
            computedAt: new Date().toISOString(),
          },
        },
      }),
    });
    const mailData = await mailRes.json();
    console.log('✅ Mail sent! ID:', mailData.result.data.id, '\n');
    const mailId = mailData.result.data.id;

    // 4. Get Inbox
    console.log('4️⃣ Getting inbox...');
    const inboxRes = await fetch(
      `${BASE_URL}/mail.inbox?input=${encodeURIComponent(JSON.stringify({ limit: 10, offset: 0 }))}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
    const inboxData = await inboxRes.json();
    console.log('✅ Inbox:', inboxData.result.data.total, 'mails\n');

    // 5. Add Reaction
    console.log('5️⃣ Adding reaction...');
    const reactionRes = await fetch(`${BASE_URL}/mail.addReaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        mailId: mailId,
        emoji: '🎉',
      }),
    });
    const reactionData = await reactionRes.json();
    console.log('✅ Reaction added!\n');

    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAPI();
