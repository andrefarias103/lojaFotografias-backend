import { Module } from '@nestjs/common';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { ProdutoModule } from './modulos/produto/produto.module';

@Module({
  imports: [CategoriaModule, ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
