import { dbReady } from '../../prisma/db'

/** Returns the connected public namespace client. Always awaits the shared ready promise. */
export async function getDb() {
  return dbReady
}

export { db as prisma } from '../../prisma/db'
