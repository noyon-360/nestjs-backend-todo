import { IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    title: string;
    
    @IsString()
    @MaxLength(500)
    description?: string;
}
