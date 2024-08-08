import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PRODUTO_REPOSITORIO } from '../../../comum/constantes/constantes';
import { AtualizaProdutoDto } from '../dto/atualiza-produto.dto';
import { CadastraProdutoDto } from '../dto/cadastra-produto.dto';
import { ListaProdutoDto } from '../dto/lista-produto.dto';
import { IProdutoRepositorio } from '../interface/produto-repositorio.interface';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject(PRODUTO_REPOSITORIO)
    private readonly produtoRepositorio: IProdutoRepositorio,
  ) {}

  async cadastrar(dadosProduto: CadastraProdutoDto): Promise<ListaProdutoDto> {
    const Produto = await this.produtoRepositorio.cadastrar(dadosProduto);
    return plainToInstance(ListaProdutoDto, Produto);
  }

  async listarTodas(): Promise<ListaProdutoDto[]> {
    const Produto = await this.produtoRepositorio.listarTodas();
    return plainToInstance(ListaProdutoDto, Produto);
  }

  async listarPorId(id: string): Promise<ListaProdutoDto> {
    const Produto = await this.produtoRepositorio.listarPorId(id);
    return plainToInstance(ListaProdutoDto, Produto);
  }

  async listarPorNome(nome: string): Promise<ListaProdutoDto[]> {
    const Produto = await this.produtoRepositorio.listarPorNome(nome);
    return plainToInstance(ListaProdutoDto, Produto);
  }

  async atualizar(id: string, dadosProduto: AtualizaProdutoDto) {
    const Produto = await this.produtoRepositorio.atualizar(id, dadosProduto);
    return plainToInstance(ListaProdutoDto, Produto);
  }

  async remover(id: string): Promise<ListaProdutoDto> {
    return await this.produtoRepositorio.remover(id);
  }
}
