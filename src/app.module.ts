import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EdsModule } from './eds/eds.module';
import { KktModule } from './kkt/kkt.module';
import { TelegramModule } from './telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelsModule } from './labels/labels.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    EdsModule,
    KktModule,
    TelegramModule,
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: 'Управление сертификатами <send@test.ru>',
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
