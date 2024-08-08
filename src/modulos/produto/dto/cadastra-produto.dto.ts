import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CadastraProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  preco: string;

  @IsNumber()
  @IsNotEmpty()
  estoque: number;

  @IsString()
  @IsNotEmpty()
  imagem: string;

  @IsString()
  @IsNotEmpty()
  categoriaId: string;
}
