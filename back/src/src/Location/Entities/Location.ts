import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../DTO/Location';
import DatabaseImage from './DatabaseImage';
 
@Entity("locations")
class Location {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    public id: string;
    
    @Column()
    public firstName: string;
    
    @Column()
    email: string;
    
    @Expose()
    @Column()
    carBrand: string;
    
    @Expose()
    @Column()
    carModel: string;
    
    @Expose()
    @Column()
    carYear: number;
    
    @Expose()
    @Column()
    town: string;
    
    @Expose()                                           
    @Column()
    startDate: string;
    
    @Expose()                                
    @Column()
    endDate: string;
    
    @Expose()                                
    @Column()
    pricePerDay: number;
    
    @JoinColumn({ name: 'imageId' })
    @OneToOne(() => DatabaseImage, {nullable: true})
    public image?: DatabaseImage;
    
    @Column({ nullable: true })
    public imageId?: string;
    
    @Expose()                                
    @Column({type: 'jsonb'})
    reservations: Reservation[];
    
    @Expose()                                
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
 
export default Location;