import { Injectable, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "./admin.service";
import * as bcrypt from 'bcrypt';
import User from "./Entities/User";

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService
    ) {}

    async validate(email: string, password: string): Promise<any> {
        const user = await this.adminService.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}