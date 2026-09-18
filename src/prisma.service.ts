import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from './prisma/db.js';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db = db;

  onModuleDestroy() {
    return this.db.close();
  }
}
