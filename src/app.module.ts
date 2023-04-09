import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { AuthGuard } from './auth/auth.guard';
import { ResearchDetailsModule } from './research-details/research-details.module';
import { WebScrapingService } from './web-scraping/web-scraping.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { MailSenderService } from './mail-sender/mail-sender.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net', //host smtp
        auth: {
          //dados do usuário e senha
          user: new ConfigService().get<string>('EMAIL_USER'),
          pass: new ConfigService().get<string>('EMAIL_PASS'),
        },
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    ResearchDetailsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    PrismaService,
    WebScrapingService,
    MailSenderService,
  ],
})
export class AppModule {}
