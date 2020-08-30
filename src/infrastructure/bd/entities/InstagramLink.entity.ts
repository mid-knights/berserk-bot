import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InstagramUser } from './InstagramUser.entity';

@Entity({ name: 'cat_instragram_link' })
export class InstagramLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @ManyToOne((type) => InstagramUser, (user) => user.links)
  user: InstagramUser;
}
