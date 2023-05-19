import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ unique: true, length: 20 })
  username: String;

  @Column({ length: 30 })
  firstname: String;

  @Column({ length: 30 })
  lastname: String;

  @Column({ unique: true })
  email: String;

  @Column()
  password: String;
}
