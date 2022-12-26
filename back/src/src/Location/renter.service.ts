import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INewRenter } from './DTO/Location';
import Renter from './Entities/Renter';
import { capitalizeFirstLetter } from './Utils/Utils';
 
@Injectable()
export class RenterService {
  constructor(
    @InjectRepository(Renter)
    private renterRepository: Repository<Renter>
  ) {}

  async createNewRenterIfNotExist(data: INewRenter): Promise<void> {

    // Verifie si le renter existe deja
    if (await this.renterRepository.findOneBy({email: data.email.toLowerCase()})) {
      return ;
    }

    // Majuscule a la premiere lettre du prenom et minuscule a l'email
    let firstName = capitalizeFirstLetter(data.firstName);
    let email = data.email.toLowerCase();
    
    // Creation du nouveau renter
    const newRenter = this.renterRepository.create({
      firstName: firstName,
      email: email
    });
    await this.renterRepository.save(newRenter);
  }

}
 
export default RenterService;