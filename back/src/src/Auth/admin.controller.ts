import { Body, Controller, Get, Post, Request, Res, Response, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from './Guards/local-auth.guard';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { registerAdminDto } from './DTO/Admin';
import { checkEmail } from 'src/Utils/Utils';
import { plainToInstance } from 'class-transformer';
import User from './Entities/User';

@Controller('api/v1/auth')
export class AdminController {

	constructor(
		private readonly adminService: AdminService,
		private readonly authService: AuthService
	) { }

	@Get('admin/exist')
	async existAdmin() {
		return await this.adminService.existAdmin()
	}

	@Post('admin/register')
	async registerAdmin(@Body(ValidationPipe) body: registerAdminDto, @Request() req, @Response() res) {
		if (!checkEmail(body.email)) {
			res.status(400).send({
				code: 400,
				message: "L'email n'est pas valide"
			});
			return;
		}

		if (body.password.length < 6) {
			res.status(400).send({
				code: 400,
				message: "Le mot de passe doit faire au moins 6 caractères"
			});
			return;
		}

		if (await this.adminService.existAdmin()) {
			res.status(400).send({
				code: 400,
				message: "Un administrateur existe déjà"
			});
			return;
		}

		try {
			await this.adminService.register(body.email, body.password);
		} catch (error) {
			console.log(error)
			res.status(400).send({
				code: 400,
				message: "Une erreur est survenue lors de l'enregistrement"
			});
			return;
		}

		res.status(200).send({
			code: 200,
			message: "L'enregistrement du compte administrateur a été effectué avec succès"
		});
	}


	@UseGuards(LocalAuthGuard)
	@Post('admin/login')
	async login(@Request() req, @Response() res) {
		res.status(200).send({
			code: 200,
			message: "Vous etes connecté",
			data: await this.authService.login(req.user),
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('admin/profile')
	getProfile(@Request() req) {
		const user = this.adminService.findOneByEmail(req.user.email);
		if (user)
			return plainToInstance(User, user, { excludeExtraneousValues: true });

		return [];
	}
}