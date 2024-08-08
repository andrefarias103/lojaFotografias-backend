import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AtualizaProdutoDto } from '../dto/atualiza-produto.dto';
import { CadastraProdutoDto } from '../dto/cadastra-produto.dto';
import { ListaProdutoDto } from '../dto/lista-produto.dto';
import { IProdutoRepositorio } from '../interface/produto-repositorio.interface';

@Injectable()
export class ProdutoRepositorio implements IProdutoRepositorio {
  constructor(private readonly prisma: PrismaService) {}
  async cadastrar(data: CadastraProdutoDto): Promise<ListaProdutoDto> {
    const produto = await this.prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        estoque: data.estoque,
        imagem: data.imagem,
        categoriaId: data.categoriaId,
      },
    });
    return produto;
  }

  async listarTodas(): Promise<ListaProdutoDto[]> {
    const produto = await this.prisma.produto.findMany();
    return plainToInstance(ListaProdutoDto, produto);
  }

  async listarPorId(id: string): Promise<ListaProdutoDto> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    return plainToInstance(ListaProdutoDto, produto);
  }

  async listarPorNome(nome: string): Promise<ListaProdutoDto[]> {
    const produto = await this.prisma.produto.findMany({
      where: { nome: { contains: nome, mode: 'insensitive' } },
    });
    return plainToInstance(ListaProdutoDto, produto);
  }

  async atualizar(
    id: string,
    data: AtualizaProdutoDto,
  ): Promise<ListaProdutoDto> {
    const produto = await this.prisma.produto.update({
      where: { id },
      data,
    });
    return produto;
  }

  async remover(id: string) {
    return await this.prisma.produto.delete({ where: { id } });
  }
}
