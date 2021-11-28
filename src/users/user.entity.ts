import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

}
