import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity("renters")
class Renter {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public firstName: string;

    @Column()
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
 
export default Renter;