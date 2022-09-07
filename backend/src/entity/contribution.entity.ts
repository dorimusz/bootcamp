import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Repository } from './repository.entity';
import { User } from './user.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  @PrimaryColumn()
  userId: number;

  @Column({ type: 'int4' })
  @PrimaryColumn()
  repositoryId: number;

  @Column({ name: 'commit_count', type: 'int4', nullable: true })
  commitCount: number;

  @ManyToOne(() => User, (user) => user.contributions, {
    onDelete: 'NO ACTION',
  })
  // @JoinColumn()
  user: User;

  @ManyToOne(() => Repository, (repository) => repository.contributions, {
    onDelete: 'NO ACTION',
  })
  // @JoinColumn()
  repository: Repository; //repository.id
}

// this table should be a joint table at the middle
