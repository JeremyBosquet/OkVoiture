import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseImageService from "./databaseImage.service";
import DatabaseImage from "./Entities/DatabaseImage";
import Location from "./Entities/Location";
import Renter from "./Entities/Renter";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import {RenterService} from "./renter.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Location, DatabaseImage, Renter]), // entities
    ],
    controllers: [LocationController], //controllers
    providers: [LocationService, DatabaseImageService, RenterService], //services
})
export class LocationModule{}