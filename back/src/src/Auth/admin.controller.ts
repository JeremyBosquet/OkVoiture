import { Body, Controller, Get, HttpStatus, Post, Request, Res, Response, UseGuards, ValidationPipe } from '@nestjs/common';
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
	async registerAdmin(@Body(ValidationPipe) body: registerAdminDto, @Response() res) {
		if (!checkEmail(body.email)) {
			res.status(HttpStatus.BAD_REQUEST).send({
				code: HttpStatus.BAD_REQUEST,
				message: "L'email n'est pas valide"
			});
			return;
		}

		if (body.password.length < 6) {
			res.status(HttpStatus.BAD_REQUEST).send({
				code: HttpStatus.BAD_REQUEST,
				message: "Le mot de passe doit faire au moins 6 caractères"
			});
			return;
		}

		if (await this.adminService.existAdmin()) {
			res.status(HttpStatus.CONFLICT).send({
				code: HttpStatus.CONFLICT,
				message: "Un administrateur existe déjà"
			});
			return;
		}

		try {
			await this.adminService.register(body.email, body.password);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).send({
				code: HttpStatus.BAD_REQUEST,
				message: "Une erreur est survenue lors de l'enregistrement"
			});
			return;
		}

		res.status(HttpStatus.CREATED).send({
			code: HttpStatus.CREATED,
			message: "L'enregistrement du compte administrateur a été effectué avec succès"
		});
	}


	@UseGuards(LocalAuthGuard)
	@Post('admin/login')
	async login(@Request() req, @Response() res) {
		res.status(HttpStatus.OK).send({
			code: HttpStatus.OK,
			message: "Vous etes connecté",
			data: await this.authService.login(req.user),
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('admin/profile')
	async getProfile(@Request() req, @Res() res) {
		const user = await this.adminService.findOneByEmail(req.user.email);
		if (!user) {
			res.status(HttpStatus.UNAUTHORIZED).send({
				code: HttpStatus.UNAUTHORIZED,
				message: "Vous n'êtes pas autorisé à accéder à cette ressource"
			});
			return;
		}

		res.status(HttpStatus.OK).send({
			code: HttpStatus.OK,
			data: plainToInstance(User, user, { excludeExtraneousValues: true })
		});
	}
}