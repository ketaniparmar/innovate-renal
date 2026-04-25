// prisma.config.ts
import 'dotenv/config';

export default {
  datasource: {
    // This tells the CLI where to push the database, satisfying Prisma 7.8
    url: process.env.DATABASE_URL,
  },
};