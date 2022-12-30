import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import User from "./Entities/User";

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async findOneById(id: string) {
		return await this.usersRepository.findOneBy({ id: id, role: 'admin' });
	}

	async findOneByEmail(email: string) {
		return await this.usersRepository.findOneBy({ email: email, role: 'admin' });
	}

	async existAdmin(): Promise<boolean> {
		return (await this.usersRepository.find({ where: { role: 'admin' } })).length > 0;
	}

	async register(email: string, password: string) {
		const user = new User();
		user.email = email.toLowerCase();
		user.password = await this.hashPassword(password);
		user.role = 'admin';

		if (user.password === null)
			throw new Error("Error while hashing password");

		await this.usersRepository.save(user);
	}

}