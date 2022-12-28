import { UseInterceptors, UploadedFile, BadRequestException, UnsupportedMediaTypeException, ParseFilePipeBuilder, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ConsoleLogger } from '@nestjs/common';
import { Body, Controller, HttpStatus, Post, Get, Param, Res, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'stream';
import { idDto, newLocationDTO, pageDto, reserveLocationDTO } from './DTO/Location';
import { LocationService } from './location.service';

@Controller('api/v1/location')
export class LocationController {

    constructor(
        private readonly locationService: LocationService
    ) {}
    
    // Creer une nouvelle location
    @Post("")
    @UseInterceptors(FileInterceptor('image'))
    async createNewLocation(@UploadedFile() image: Express.Multer.File, @Body(ValidationPipe) body: newLocationDTO, @Res() res: Response): Promise<void> {

        // Verification des données recues et envoie de messages d'erreurs si besoin
        if (!(await this.locationService.verifyLocationData(body, image, res)))
            return ;

        // creation de la location dans la base de donnée
        try {
           await this.locationService.createNewLocation(body, image);
        }
        catch (e) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Une erreur est survenue, veuillez réessayer plus tard",
                code: HttpStatus.INTERNAL_SERVER_ERROR
            });
            return ;
        }

        // Envoie au client un message
        res.status(HttpStatus.OK).send({
            message: "Votre véhicule a bien été ajouté.",
            code: HttpStatus.CREATED
        });    
    }

    // Recuperer toutes les locations
    @Get("/all")
    async getAllLocations(@Res() res: Response): Promise<void> {
        const locations = await this.locationService.getAllLocations();
        
        res.status(HttpStatus.OK).json(locations);
    }
    
    // Recuperer les locations par prix croissant
    @Get("/sortedByAscPrice")
    async getLocationBySortedLowestPrice(@Res() res: Response): Promise<void> {
        const locations = await this.locationService.getLocationSortedByLowestPrice();

        res.status(HttpStatus.OK).json(locations);
    }

    // Recuperer la location par id
    @Get("/:id")
    async getLocationById(@Param(ValidationPipe) param: idDto, @Res() res: Response): Promise<void> {
        const location = await this.locationService.getLocationById(param.id);

        res.status(HttpStatus.OK).json(location);
    }

    // Recuperer l'image d'une location par son id
    @Get("image/:id")
    async getImageLocation(@Param(ValidationPipe) param: idDto, @Res() res: Response): Promise<void> {
        // Recupere l'image de la base de donnée
        const image = await this.locationService.getImageLocationById(param.id);
 
        // Verifie si l'image existe dans la base de donnée sinon envoie un message d'erreur au client
        if (!image) {
            res.status(HttpStatus.NOT_FOUND).send({message: "Image not found", code: HttpStatus.NOT_FOUND});
            return ;
        }

        // Affiche l'image
        const stream = Readable.from(image.data);
        stream.pipe(res);
    }

    @Post("/reservation")
    async reservationLocation(@Body(ValidationPipe) body: reserveLocationDTO, @Res() res: Response): Promise<void> {
        // Verification des données recues et envoie de messages d'erreurs si besoin
        if (!(await this.locationService.verifyReservationData(body, res)))
            return ;

        // creation de la reservation dans la base de donnée
        try {
           await this.locationService.createNewReservationLocation(body);
        }
        catch (e) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Une erreur est survenue, veuillez réessayer plus tard",
                code: HttpStatus.INTERNAL_SERVER_ERROR
            });
            return ;
        }

        res.status(HttpStatus.OK).json({
            message: "Votre réservation a bien été prise en compte", 
            code: HttpStatus.OK
        });
    }
}