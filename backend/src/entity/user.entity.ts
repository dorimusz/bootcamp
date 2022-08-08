import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  avatar_url: string;

  @Column()
  html_url: string;

  @Column()
  type: string;
}
