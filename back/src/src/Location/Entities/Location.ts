import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ireservation } from '../DTO/Location';
import DatabaseImage from './DatabaseImage';
 
@Entity("locations")
class Location {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public firstName: string;

    @Column()
    email: string;

    @Column()
    carBrand: string;

    @Column()
    carModel: string;

    @Column()
    carYear: number;

    @Column()
    town: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    pricePerDay: number;
    
    @JoinColumn({ name: 'imageId' })
    @OneToOne(() => DatabaseImage, {nullable: true})
    public image?: DatabaseImage;
    
    @Column({ nullable: true })
    public imageId?: string;
    
    @Column({type: 'jsonb'})
    reservations: Ireservation[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
 
export default Location;