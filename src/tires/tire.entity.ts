import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tire {

  @PrimaryGeneratedColumn()
  id: number;

  //사용자id
  @Column()
  userId: string;

  //폭
  @Column()
  width: number;

  //편평비
  @Column()
  flatnessRatio: number;

  //휠사이즈
  @Column()
  size: number;

}
