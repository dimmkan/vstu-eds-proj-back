import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_labels' })
export class UsersLabelsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  comp_name: string;

  @Column('simple-json')
  ids_array: number[];
}
