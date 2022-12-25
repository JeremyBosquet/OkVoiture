import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DatabaseImage from './Entities/DatabaseImage';
 
@Injectable()
class DatabaseImageService {
  constructor(
    @InjectRepository(DatabaseImage)
    private databaseImagesRepository: Repository<DatabaseImage>,
  ) {}
 
  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = this.databaseImagesRepository.create({
      filename,
      data: dataBuffer
    })
    await this.databaseImagesRepository.save(newFile);
    return newFile;
  }
 
  async getFileById(fileId: string) {
    const file = await this.databaseImagesRepository.findOneBy({id: fileId});
    if (!file) {
      return null;
    }
    return file;
  }

  isValidImageType(image: Express.Multer.File) {
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validMimeTypes.includes(image.mimetype);
  }

  isValidImage(image: Express.Multer.File) {
    if (!image || !image.buffer || !image.originalname)
      return false;

    if (image.size > 1e7)
      return false;

    return true;
  }
}
 
export default DatabaseImageService;