#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7f7a63fb25fd9163b4883520f8b572448428333582f9de9018c05b3a755435bb/contract';
import endContract from '../../snapshots/7f7a63fb25fd9163b4883520f8b572448428333582f9de9018c05b3a755435bb/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b42236b376bf2c29fc84d889c50247d3115305c3f4dbb75c1b7985da68ccc47d/contract';
import startContract from '../../snapshots/b42236b376bf2c29fc84d889c50247d3115305c3f4dbb75c1b7985da68ccc47d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, rawSql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('age', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      rawSql({
        id: 'data_migration.backfill-user-age',
        label: 'Data transform: backfill-user-age',
        operationClass: 'data',
        target: { id: 'postgres' },
        precheck: [{
          description: 'Check backfill-user-age has work to do',
          sql: 'SELECT EXISTS (SELECT "id" AS "id" FROM "public"."user" WHERE "age" IS NULL LIMIT 1) AS ok',
          params: [],
        }],
        execute: [{
          description: 'Run backfill-user-age',
          sql: 'UPDATE "public"."user" SET "age" = $1, "updatedAt" = now() WHERE "age" IS NULL',
          params: [0],
        }],
        postcheck: [{
          description: 'Verify backfill-user-age resolved all violations',
          sql: 'SELECT NOT EXISTS (SELECT "id" AS "id" FROM "public"."user" WHERE "age" IS NULL LIMIT 1) AS ok',
          params: [],
        }],
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'age' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      rawSql({
        id: 'data_migration.backfill-user-phone',
        label: 'Data transform: backfill-user-phone',
        operationClass: 'data',
        target: { id: 'postgres' },
        precheck: [{
          description: 'Check backfill-user-phone has work to do',
          sql: 'SELECT EXISTS (SELECT "id" AS "id" FROM "public"."user" WHERE "phone" IS NULL LIMIT 1) AS ok',
          params: [],
        }],
        execute: [{
          description: 'Run backfill-user-phone',
          sql: 'UPDATE "public"."user" SET "phone" = $1, "updatedAt" = now() WHERE "phone" IS NULL',
          params: [''],
        }],
        postcheck: [{
          description: 'Verify backfill-user-phone resolved all violations',
          sql: 'SELECT NOT EXISTS (SELECT "id" AS "id" FROM "public"."user" WHERE "phone" IS NULL LIMIT 1) AS ok',
          params: [],
        }],
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'phone' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      rawSql({
        id: 'data_migration.backfill-user-password',
        label: 'Data transform: backfill-user-password',
        operationClass: 'data',
        target: { id: 'postgres' },
        precheck: [{
          description: 'Check backfill-user-password has work to do',
          sql: 'SELECT EXISTS (SELECT "id" AS "id" FROM "public"."user" WHERE "password" IS NULL LIMIT 1) AS ok',
          params: [],
        }],
        execute: [{
          description: 'Run backfill-user-password',
          sql: 'UPDATE "public"."user" SET "password" = $1, "updatedAt" = now() WHERE "password" IS NULL',
          params: [''],
        }],
        postcheck: [{
          description: 'Verify backfill-user-password resolved all violations',
          sql: 'SELECT NOT EXISTS (SELECT "id" AS "id" FROM "public"."user" WHERE "password" IS NULL LIMIT 1) AS ok',
          params: [],
        }],
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'password' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
