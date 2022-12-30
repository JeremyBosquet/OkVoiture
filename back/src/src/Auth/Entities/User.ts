import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity("users")
class User {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Expose()
    @Column()
    email: string;

    @Column()
    password: string;

    @Expose()
    @Column()
    role: string;
    
    @Expose()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
 
export default User;