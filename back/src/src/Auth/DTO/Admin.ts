import { IsNotEmpty } from "class-validator";

export class registerAdminDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}