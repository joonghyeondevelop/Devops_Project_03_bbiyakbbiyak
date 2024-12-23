import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AlarmLogsModule } from './alarm-logs/alarm-logs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AlarmModule } from './alarm/alarm.module';
import { NotificationModule } from './notification/notification.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { ExceptionHandler } from './Exception/ExceptionHandler';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    CommonModule,
    LoginModule,
    SignupModule,
    AlarmLogsModule,
    NotificationModule,
    ScheduleModule.forRoot(),// 스케쥴링 모듈
    AlarmModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionHandler],
})
export class AppModule { }

