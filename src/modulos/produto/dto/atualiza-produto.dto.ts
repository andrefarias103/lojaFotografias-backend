import { PartialType } from '@nestjs/mapped-types';
import { CadastraProdutoDto } from './cadastra-produto.dto';

export class AtualizaProdutoDto extends PartialType(CadastraProdutoDto) {}
