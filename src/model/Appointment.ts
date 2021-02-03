import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('time with time zone')
    date: Date;
    
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}

export default Appointment;