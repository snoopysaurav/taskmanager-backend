import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

enum Role {
  USER = "user",
  ADMIN = "admin",
}

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

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => TaskEntity, (task) => task.user)
  task: TaskEntity[];
}
