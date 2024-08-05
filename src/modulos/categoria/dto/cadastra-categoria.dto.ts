import { IsNotEmpty, IsString } from 'class-validator';

export class CadastraCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
