import { getDbReady } from '../../prisma/db.js'

/** Returns the connected public namespace client. Always awaits the shared ready promise. */
export async function getDb() {
  return getDbReady()
}

export { db as prisma } from '../../prisma/db.js'
