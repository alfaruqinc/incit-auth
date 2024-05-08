import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DashboardsController } from './dashboards.controller';

@Module({
  imports: [UsersModule],
  controllers: [DashboardsController],
})
export class DashboardsModule {}
