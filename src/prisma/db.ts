import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../../prisma/schema.d';
import contractJson from '../../prisma/schema.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

/** Eagerly-initialized connection promise. Prevents race conditions on first request. */
export const dbReady: Promise<typeof db.orm.public> = db.connect().then(() => db.orm.public);
