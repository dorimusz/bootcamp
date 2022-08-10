// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Contribution } from './contribution.entity';

@Entity('repository')
export class Repository extends BaseEntity {
  @PrimaryColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  @ManyToOne(() => User, (user) => user.repository, { onDelete: 'SET NULL' }) //if user is deleted, set ownerid to null
  owner: User;
  // owner: number;
  //a repository can have a relationship with only one user
  // @JoinColumn({ name: 'owner' }) //has the foreign key, use it only at on side - optional, ha mas propertyvel kell
  // ownerId: User; //owner.id    owner es ownerId elnevezesek???

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

  @OneToMany(() => Contribution, (contribution) => contribution.repository)
  contributions: Contribution[];
}
