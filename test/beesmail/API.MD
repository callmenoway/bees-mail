Creare file separati per ogni dominio src/server/procedure/file.ts
seguendo la seguente struttura

```
import { publicProcedure, router } from '../router/trpc';
import { z } from 'zod';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(({ input }) => {
      console.log('Login attempt:', input.email);
      return { success: true, token: 'abc123' };
    }),
});
```

poi aggiornare src/server/procedure/index.ts

```
import { router } from '../router/trpc';
import { authRouter } from './auth';
import { messagesRouter } from './messages';

const appRouter = router({
  auth: authRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
export default appRouter;
```

poi nel client

```
// Login
await trpc.auth.login.mutate({ email: 'test@test.com', password: 'pass' });

// Invia messaggio
await trpc.messages.send.mutate({ to: 'user@test.com', subject: 'Hi', body: 'Hello!' });

// Lista messaggi
const messages = await trpc.messages.list.query();
```