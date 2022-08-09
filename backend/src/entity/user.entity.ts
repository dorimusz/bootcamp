import { Entity, Column, OneToMany, PrimaryColumn, BaseEntity } from 'typeorm';
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

  //a user can have more than one repository, so it's a one-to-many relationship??
  @OneToMany(() => Repository, (repository) => repository.owner, {
    onDelete: 'NO ACTION',
  })
  repository: Repository;
}
