import { Entity, Column, OneToOne, PrimaryColumn, BaseEntity } from 'typeorm';
import { Repository } from './repository.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number; //owner.id

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  avatar_url: string;

  @Column({ type: 'varchar', length: 255 })
  html_url: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @OneToOne(() => Repository, (repository) => repository.owner)
  repository: Repository;
}
