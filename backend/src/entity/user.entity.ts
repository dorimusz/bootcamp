import { Entity, Column, OneToMany, PrimaryColumn, BaseEntity } from 'typeorm';
import { Repository } from './repository.entity';
import { Contribution } from './contribution.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'int4' })
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
    onDelete: 'NO ACTION', //if repository is deleted, don't do anything
  })
  repository: Repository[];

  @OneToMany(() => Contribution, (contribution) => contribution.user)
  contribution: Contribution[]; // array or not?
}
