import { Module } from '@nestjs/common';
import { PRODUTO_REPOSITORIO } from '../../comum/constantes/constantes';
import { PrismaService } from './../../../prisma/prisma.service';
import { ProdutoController } from './controlador/produto.controller';
import { ProdutoRepositorio } from './repositorio/produto.repositorio';
import { ProdutoService } from './servico/produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    ProdutoRepositorio,
    PrismaService,
    {
      provide: PRODUTO_REPOSITORIO,
      useClass: ProdutoRepositorio,
    },
  ],
})
export class ProdutoModule {}
