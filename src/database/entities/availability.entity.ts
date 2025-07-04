import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DayAvailability } from "./day-availability.entity";
import { User } from "./user.entity";

@Entity()
export class Availability {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (user) => user.availability)
  user: User;

  @OneToMany(
    () => DayAvailability,
    (dayAvailability) => dayAvailability.availability,
    {
      cascade: true,
    },
  )
  days: DayAvailability[];

  @Column({ default: 30 })
  timeGap: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
