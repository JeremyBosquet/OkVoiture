import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { Body, Controller, HttpStatus, Post, Get, Param, Res, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'stream';
import { idDto, newLocationDTO } from './DTO/Location';
import { LocationService } from './location.service';

@Controller('api/v1/location')
export class LocationController {

    constructor(
        private readonly locationService: LocationService
    ) {}
    
    // Creer une nouvelle location
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createNewLocation(@Body(ValidationPipe) body: newLocationDTO, @Res() res: Response, @UploadedFile() image: Express.Multer.File): void {
        // Verification des données recues
        if (!this.locationService.verifyLocationData(body, res))
            return ;

        // creation de la location dans la base de donnée
        try {
            this.locationService.createNewLocation(body, image);
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
            code: HttpStatus.OK
        });    
    }

    // Recuperer toutes les locations
    @Get("/all")
    async getAllLocations(@Res() res: Response): Promise<void> {
        const locations = await this.locationService.getAllLocations();
        
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
}