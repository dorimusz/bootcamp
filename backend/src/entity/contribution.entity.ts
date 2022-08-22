import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Repository } from './repository.entity';
import { User } from './user.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryColumn({ type: 'int4' })
  id: number;
  // @ManyToOne(() => User, (user) => user.contribution)
  // user: User;

  // @Column({ type: 'int4' })
  // @ManyToOne(() => Repository, (repository) => repository.contributions)
  // repository: Repository; //repository.id
  @Column({ name: 'commit_count', type: 'int4' })
  commitCount: number;
}

// this table should be a joint table at the middle
