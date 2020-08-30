import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InstagramLink } from './InstagramLink.entity';

@Entity({ name: 'cat_instragram_user' })
export class InstagramUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  avatarUrl: string;

  @OneToMany((type) => InstagramLink, (link) => link.user)
  links: InstagramLink[];
}
