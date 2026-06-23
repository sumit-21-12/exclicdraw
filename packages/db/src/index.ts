// packages/db/src/index.ts

import { PrismaClient } from "./generated/prisma/client";

export const prisma = new PrismaClient();
