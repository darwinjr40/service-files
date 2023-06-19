import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateArchivoDto {
    // isInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    foreign_id: number;

    // isString, Minlenth 1
    // @IsString()
    // @MinLength(1)
    url?: string;
}
