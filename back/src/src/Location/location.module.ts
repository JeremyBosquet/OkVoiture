import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseImageService from "./databaseImage.service";
import DatabaseImage from "./Entities/DatabaseImage";
import Location from "./Entities/Location";
import Renter from "./Entities/Renter";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import {RenterService} from "./renter.service";
import { HttpModule } from '@nestjs/axios'
import { AdminService } from "src/Auth/admin.service";
import User from "src/Auth/Entities/User";

@Module({
    imports: [
        TypeOrmModule.forFeature([Location, DatabaseImage, Renter, User]), // entities
        HttpModule
    ],
    controllers: [LocationController], //controllers
    providers: [LocationService, DatabaseImageService, RenterService, AdminService], //services
})
export class LocationModule{}