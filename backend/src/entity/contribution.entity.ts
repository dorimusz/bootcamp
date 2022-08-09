import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('contribution')
export class Contribution {
  @PrimaryColumn({ type: 'int4' })
  user: number;

  @Column({ type: 'int4' })
  repository: number;
}
