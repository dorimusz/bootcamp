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
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repository } from './repository.entity';
import { Contribution } from './contribution.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'int4' })
  userId: number;

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
  @OneToMany(() => Repository, (repository) => repository.ownerId, {
    onDelete: 'NO ACTION', //if repository is deleted, don't do anything
  })
  repositories: Repository[];

  @OneToMany(() => Contribution, (contribution) => contribution.user, {
    onDelete: 'NO ACTION',
  })
  contributions: Contribution[]; // array or not?
}
