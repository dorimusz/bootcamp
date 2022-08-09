import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('contribution')
export class Contribution {
  @PrimaryColumn()
  user: number;

  @Column()
  repository: number;
}
