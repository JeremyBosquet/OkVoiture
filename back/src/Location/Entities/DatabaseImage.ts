import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity("location_images")
class DatabaseImage {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
    
    @Column()
    filename: string;

    @Column({
        type: 'bytea',
    })
    data: Uint8Array;
}

export default DatabaseImage;