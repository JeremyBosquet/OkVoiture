import { Repository } from 'typeorm';
import { INewRenter } from './DTO/Location';
import Renter from './Entities/Renter';
export declare class RenterService {
    private renterRepository;
    constructor(renterRepository: Repository<Renter>);
    createNewRenterIfNotExist(data: INewRenter): Promise<void>;
}
export default RenterService;
