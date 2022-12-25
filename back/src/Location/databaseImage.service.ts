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
    const newFile = await this.databaseImagesRepository.create({
      filename,
      data: dataBuffer
    })
    await this.databaseImagesRepository.save(newFile);
    return newFile;
  }
 
  async getFileById(fileId: string) {
    const file = await this.databaseImagesRepository.findOne({where: {id: fileId}});
    if (!file) {
      return null;
    }
    return file;
  }
}
 
export default DatabaseImageService;