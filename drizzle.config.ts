import type { Config } from 'drizzle-kit'

import { env } from '@/lib/env'

export default {
  schema: './app/lib/db/schema/index.ts',
  out: './app/lib/db/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN!,
  },
  verbose: true,
} satisfies Config
