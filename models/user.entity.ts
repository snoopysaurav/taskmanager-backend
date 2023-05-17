import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ unique: true })
  username: String;

  @Column({ unique: true })
  email: String;

  @Column()
  password: String;
}
