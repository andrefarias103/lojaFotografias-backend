import { Module } from '@nestjs/common';
import { CategoriaModule } from './modulos/categoria/categoria.module';

@Module({
  imports: [CategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
