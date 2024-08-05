import { PartialType } from '@nestjs/mapped-types';
// import { IsOptional, IsString } from 'class-validator';
import { CadastraCategoriaDto } from './cadastra-categoria.dto';

export class AtualizaCategoriaDto extends PartialType(CadastraCategoriaDto) {}
