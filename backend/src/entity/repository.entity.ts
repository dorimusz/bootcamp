// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity('repository')
export class Repository extends BaseEntity {
  @PrimaryColumn()
  id: number;

  //one-to-one relationship with user
  @JoinColumn({ name: 'owner_id' })
  @OneToOne(() => User, (user) => user.repository)
  owner: User; //owner.id

  @Column()
  owner_id: number;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  html_url: string;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  @Column()
  stargazer_count: number;
}
