import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  Index,
  BaseEntity,
  JoinTable,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Repository } from './repository.entity';
import { Contribution } from './contribution.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'int4' })
  // @OneToMany(() => Repository, (repository) => repository.owner)
  // @JoinColumn()
  id: number; //owner.id

  @Index('login-idx')
  @Column({ type: 'varchar', nullable: true })
  login: string;

  @Column({ type: 'varchar', nullable: true })
  avatar_url: string;

  @Column({ type: 'varchar', nullable: true })
  html_url: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  //a user can have more than one repository, so it's a one-to-many relationship??
  @ManyToMany(() => Repository, (repository) => repository.users, {
    onDelete: 'NO ACTION', //if repository is deleted, don't do anything
  })
  @JoinTable()
  repositories: Repository[];

  //   @OneToMany(() => Contribution, (contribution) => contribution.user)
  //   contribution: Contribution; // array or not?
}
