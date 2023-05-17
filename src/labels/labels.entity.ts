import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  flag: number;

  @BeforeInsert()
  insertCreated() {
    this.flag = 1;
  }

  @BeforeUpdate()
  insertUpdated() {
    this.flag = 1;
  }
}
