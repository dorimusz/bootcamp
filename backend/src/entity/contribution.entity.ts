import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Repository } from './repository.entity';
import { User } from './user.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryColumn({ type: 'int4', unique: true })
  userId: number;
  @ManyToOne(() => User, (user) => user.contribution)
  @JoinColumn()
  user: User;

  @Column({ type: 'int4' })
  repositoryId: number;
  @ManyToOne(() => Repository, (repository) => repository.contributions)
  @JoinColumn()
  repository: Repository; //repository.id

  @Column({ name: 'commit_count', type: 'int4', nullable: true })
  commitCount: number;
}

// this table should be a joint table at the middle
