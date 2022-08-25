import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Repository } from './repository.entity';
import { User } from './user.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  userId: number;
  @ManyToOne(() => User, (user) => user.contribution, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'int4' })
  repositoryId: number;
  @ManyToOne(() => Repository, (repository) => repository.contributions, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn()
  repository: Repository; //repository.id

  @Column({ name: 'commit_count', type: 'int4', nullable: true })
  commitCount: number;
}

// this table should be a joint table at the middle
