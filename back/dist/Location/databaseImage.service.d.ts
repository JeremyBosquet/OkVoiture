/// <reference types="node" />
/// <reference types="multer" />
import { Repository } from 'typeorm';
import DatabaseImage from './Entities/DatabaseImage';
declare class DatabaseImageService {
    private databaseImagesRepository;
    constructor(databaseImagesRepository: Repository<DatabaseImage>);
    uploadDatabaseFile(dataBuffer: Buffer, filename: string): Promise<DatabaseImage>;
    getFileById(fileId: string): Promise<DatabaseImage>;
    isValidImageType(image: Express.Multer.File): boolean;
    isValidImage(image: Express.Multer.File): boolean;
}
export default DatabaseImageService;
