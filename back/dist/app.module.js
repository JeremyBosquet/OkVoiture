"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const Location_1 = require("./Location/Entities/Location");
const location_module_1 = require("./Location/location.module");
const location_service_1 = require("./Location/location.service");
const schedule_1 = require("@nestjs/schedule");
const databaseImage_service_1 = require("./Location/databaseImage.service");
const Renter_1 = require("./Location/Entities/Renter");
const DatabaseImage_1 = require("./Location/Entities/DatabaseImage");
const renter_service_1 = require("./Location/renter.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule, schedule_1.ScheduleModule.forRoot()],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    entities: [Location_1.default, DatabaseImage_1.default, Renter_1.default],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([Location_1.default, DatabaseImage_1.default, Renter_1.default]),
            location_module_1.LocationModule,
        ],
        controllers: [],
        providers: [location_service_1.LocationService, databaseImage_service_1.default, renter_service_1.default],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map