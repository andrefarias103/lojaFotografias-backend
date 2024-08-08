import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AtualizaProdutoDto } from '../dto/atualiza-produto.dto';
import { CadastraProdutoDto } from '../dto/cadastra-produto.dto';
import { ListaProdutoDto } from '../dto/lista-produto.dto';
import { ProdutoService } from '../servico/produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async cadastraProduto(
    @Body() dadosProduto: CadastraProdutoDto,
  ): Promise<ListaProdutoDto> {
    return await this.produtoService.cadastrar(dadosProduto);
  }

  @Get()
  async ListarTodas(): Promise<ListaProdutoDto[]> {
    return await this.produtoService.listarTodas();
  }

  @Get(':id')
  async ListarPorId(@Param('id') id: string): Promise<ListaProdutoDto> {
    return await this.produtoService.listarPorId(id);
  }

  @Get('nome/:nome')
  async ListarPorNome(@Param('nome') nome: string): Promise<ListaProdutoDto[]> {
    return await this.produtoService.listarPorNome(nome);
  }

  @Patch(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDto,
  ) {
    return this.produtoService.atualizar(id, dadosProduto);
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
    const produtoRemovida = await this.produtoService.remover(id);
    return {
      produto: produtoRemovida,
      mensagem: 'Produto removida com sucesso',
    };
  }
}
