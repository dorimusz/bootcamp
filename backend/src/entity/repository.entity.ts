// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity('repository')
export class Repository extends BaseEntity {
  @PrimaryColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  owner: number;
  //a repository can have a relationship with only one user
  @ManyToOne(() => User, (user) => user.repository, { onDelete: 'SET NULL' }) //if user is deleted, set ownerid to null
  @JoinColumn({ name: 'owner' }) //has the foreign key, use it only at on side
  ownerId: User; //owner.id

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  html_url: string;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  @Column({ type: 'int4' })
  stargazer_count: number;
}
