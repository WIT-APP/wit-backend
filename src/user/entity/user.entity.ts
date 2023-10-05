import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column()
		email: string;

	@Column()
		password: string;
	
	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}
}
