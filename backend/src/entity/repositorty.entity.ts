import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Repository {
  @PrimaryColumn()
  id: number;

  @Column()
  owner: number;

  @Column()
  full_name: string;

  @Column()
  description: string;

  @Column()
  html_url: string;

  @Column()
  language: string;

  @Column()
  stargazer_count: number;
}
