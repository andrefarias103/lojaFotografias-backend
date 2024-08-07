import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CATEGORIA_REPOSITORIO } from '../../../comum/constantes/constantes';
import { AtualizaCategoriaDto } from '../dto/atualiza-categoria.dto';
import { CadastraCategoriaDto } from '../dto/cadastra-categoria.dto';
import { ListaCategoriaDto } from '../dto/lista-categoria.dto';
import { ICategoriaRepositorio } from '../interface/categoria-repositorio.interface';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject(CATEGORIA_REPOSITORIO)
    private readonly categoriaRepositorio: ICategoriaRepositorio,
  ) {}

  async cadastrar(
    dadosCategoria: CadastraCategoriaDto,
  ): Promise<ListaCategoriaDto> {
    const categoria = await this.categoriaRepositorio.cadastrar(dadosCategoria);
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async listarTodas(): Promise<ListaCategoriaDto[]> {
    const categoria = await this.categoriaRepositorio.listarTodas();
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async listarPorId(id: string): Promise<ListaCategoriaDto> {
    const categoria = await this.categoriaRepositorio.listarPorId(id);
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async listarPorNome(nome: string): Promise<ListaCategoriaDto[]> {
    const categoria = await this.categoriaRepositorio.listarPorNome(nome);
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async atualizar(id: string, dadosCategoria: AtualizaCategoriaDto) {
    const categoria = await this.categoriaRepositorio.atualizar(
      id,
      dadosCategoria,
    );
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async remover(id: string): Promise<ListaCategoriaDto> {
    return await this.categoriaRepositorio.remover(id);
  }
}
