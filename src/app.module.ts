import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { ImageListModule } from './image-list/image-list.module';
import { getMongooseModule } from './utils/mongodb.utils';
import configuration from './config/configuration';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }),
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }),
    ImageModule, ImageListModule, getMongooseModule()],
  providers: [
    {
      provide: APP_GUARD, useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }
