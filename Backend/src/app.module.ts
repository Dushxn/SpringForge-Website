import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PluginModule } from './plugin/plugin.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PluginModule,
    AdminModule,
    FeedbackModule,
  ],
})
export class AppModule {}
