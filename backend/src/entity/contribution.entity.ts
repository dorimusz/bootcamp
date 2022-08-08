import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Contribution {
  @PrimaryColumn()
  user: number;

  @Column()
  repository: number;

  @Column()
  line_count: number;
}
