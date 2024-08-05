import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AtualizaCategoriaDto } from '../dto/atualiza-categoria.dto';
import { CadastraCategoriaDto } from '../dto/cadastra-categoria.dto';
import { ListaCategoriaDto } from '../dto/lista-categoria.dto';
import { CategoriaService } from '../servico/categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async cadastraCategoria(
    @Body() dadosCategoria: CadastraCategoriaDto,
  ): Promise<ListaCategoriaDto> {
    return await this.categoriaService.cadastrar(dadosCategoria);
  }

  @Get()
  async ListarTodas(): Promise<ListaCategoriaDto[]> {
    return await this.categoriaService.listarTodas();
  }

  @Get(':id')
  async ListarPorId(@Param('id') id: string): Promise<ListaCategoriaDto> {
    return await this.categoriaService.listarPorId(id);
  }

  @Get('nome/:nome')
  async ListarPorNome(
    @Param('nome') nome: string,
  ): Promise<ListaCategoriaDto[]> {
    return await this.categoriaService.listarPorNome(nome);
  }

  @Patch(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() dadosCategoria: AtualizaCategoriaDto,
  ) {
    return this.categoriaService.atualizar(id, dadosCategoria);
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
    const categoriaRemovida = await this.categoriaService.remover(id);
    return {
      categoria: categoriaRemovida,
      mensagem: 'Categoria removida com sucesso',
    };
  }
}
