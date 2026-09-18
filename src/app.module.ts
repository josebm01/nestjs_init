import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TasksModule } from './tasks/tasks.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { InitController } from './init/init.controller.js';
import { PrismaModule } from './prisma.module.js';
import { PaymentsModule } from './payments/payments.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'myapp',
    // }),
    PrismaModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
  ],
  controllers: [InitController],
  providers: [],
})
export class AppModule {}
