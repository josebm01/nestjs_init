#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract';
import startContract from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/b42236b376bf2c29fc84d889c50247d3115305c3f4dbb75c1b7985da68ccc47d/contract';
import endContract from '../../snapshots/b42236b376bf2c29fc84d889c50247d3115305c3f4dbb75c1b7985da68ccc47d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'post' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-user-password', {
        check: () => placeholder('backfill-user-password:check'),
        run: () => placeholder('backfill-user-password:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'password' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
