import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Image must be a string' })
    image?: string;

    @IsOptional()
    @IsBoolean({ message: 'IsActive must be a boolean value' })
    isActive?: boolean = true;
}
