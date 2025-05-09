import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  tenantId: string;

  @Column()
  tenantName: string;
}