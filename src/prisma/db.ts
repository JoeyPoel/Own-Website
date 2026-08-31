import 'dotenv/config';

// Polyfill Temporal globally to satisfy pg/timestamptz-temporal codec in environment
if (typeof (globalThis as any).Temporal === 'undefined') {
  (globalThis as any).Temporal = {
    Instant: {
      from(epochNanosecondsOrString: any) {
        // Return a compatible Temporal-like instance wrapping JavaScript Date
        const date = new Date(epochNanosecondsOrString);
        return {
          toString() { return date.toISOString(); },
          epochMilliseconds: date.getTime(),
          epochNanoseconds: BigInt(date.getTime()) * 1000000n,
        };
      }
    }
  };
}

// Polyfill BigInt serialization to prevent JSON.stringify crashes in API responses
if (typeof (BigInt.prototype as any).toJSON === 'undefined') {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}

import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../../prisma/schema.d.js';
import contractJson from '../../prisma/schema.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

let connectionPromise: Promise<typeof db.orm.public> | null = null;

/** Lazily-initialized connection promise. Prevents top-level crashes on startup. */
export function getDbReady(): Promise<typeof db.orm.public> {
  if (!connectionPromise) {
    connectionPromise = db.connect()
      .then(() => db.orm.public)
      .catch((err) => {
        connectionPromise = null; // reset to allow retry
        throw err;
      });
  }
  return connectionPromise;
}
