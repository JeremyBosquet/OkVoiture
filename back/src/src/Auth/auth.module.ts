import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import User from "./Entities/User";
require('dotenv').config();

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // entities
        PassportModule,
        JwtModule.register( {
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2d' },
        }),
    ],
    controllers: [AdminController], //controllers
    providers: [AdminService, AuthService, LocalStrategy, JwtStrategy], //services
})
export class AuthModule{}