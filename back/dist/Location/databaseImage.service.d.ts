/// <reference types="node" />
import { Repository } from 'typeorm';
import DatabaseImage from './Entities/DatabaseImage';
declare class DatabaseImageService {
    private databaseImagesRepository;
    constructor(databaseImagesRepository: Repository<DatabaseImage>);
    uploadDatabaseFile(dataBuffer: Buffer, filename: string): Promise<DatabaseImage>;
    getFileById(fileId: string): Promise<DatabaseImage>;
}
export default DatabaseImageService;
