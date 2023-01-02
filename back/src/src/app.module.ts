import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Location from './Location/Entities/Location';
import { LocationModule } from './Location/location.module';
import { LocationService } from './Location/location.service';
import { ScheduleModule } from '@nestjs/schedule';
import DatabaseImageService from './Location/databaseImage.service';
import Renter from './Location/Entities/Renter';
import DatabaseImage from './Location/Entities/DatabaseImage';
import RenterService from './Location/renter.service';
import { HttpModule } from '@nestjs/axios';
import { AdminService } from './Auth/admin.service';
import { AuthModule } from './Auth/auth.module';
import User from './Auth/Entities/User';

@Module({
  imports: [    
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [Location, DatabaseImage, Renter, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Location, DatabaseImage, Renter, User]),
    LocationModule,
    AuthModule,
    HttpModule
  ],
  controllers: [],
  providers: [LocationService, DatabaseImageService, RenterService, AdminService],
})
export class AppModule {}
