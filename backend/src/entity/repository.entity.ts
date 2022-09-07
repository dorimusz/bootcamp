// eslint-disable-next-line prettier/prettier
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  ManyToOne,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Contribution } from './contribution.entity';

@Entity('repository')
export class Repository extends BaseEntity {
  @PrimaryColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  ownerId: number;
  // @JoinTable()
  // owner: number;
  //a repository can have a relationship with only one user
  // @JoinColumn({ name: 'owner' }) //has the foreign key, use it only at on side - optional, ha mas propertyvel kell
  // ownerId: User; //owner.id    owner es ownerId elnevezesek???

  @Index('name-idx')
  @Column({ type: 'varchar', nullable: true })
  full_name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  html_url: string;

  @Column({ type: 'varchar', nullable: true })
  language: string;

  @Column({ type: 'int4', nullable: true })
  stargazer_count: number;

  @OneToMany(() => Contribution, (contribution) => contribution.repository)
  contributions: Contribution[];

  // @ManyToOne(() => User, (user) => user.userId, { onDelete: 'SET NULL' })
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn()
  owner: User; //if user is deleted, set ownerid to null
}
