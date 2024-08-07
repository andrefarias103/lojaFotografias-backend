import { Module } from '@nestjs/common';
import { CATEGORIA_REPOSITORIO } from '../../comum/constantes/constantes';
import { PrismaService } from './../../../prisma/prisma.service';
import { CategoriaController } from './controlador/categoria.controller';
import { CategoriaRepositorio } from './repositorio/categoria.repositorio';
import { CategoriaService } from './servico/categoria.service';

@Module({
  controllers: [CategoriaController],
  providers: [
    CategoriaService,
    CategoriaRepositorio,
    PrismaService,
    {
      provide: CATEGORIA_REPOSITORIO,
      useClass: CategoriaRepositorio,
    },
  ],
})
export class CategoriaModule {}
