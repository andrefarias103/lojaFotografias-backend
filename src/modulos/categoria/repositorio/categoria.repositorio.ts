import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AtualizaCategoriaDto } from '../dto/atualiza-categoria.dto';
import { CadastraCategoriaDto } from '../dto/cadastra-categoria.dto';
import { ListaCategoriaDto } from '../dto/lista-categoria.dto';
import { ICategoriaRepositorio } from '../interface/categoria-repositorio.interface';

@Injectable()
export class CategoriaRepositorio implements ICategoriaRepositorio {
  constructor(private readonly prisma: PrismaService) {}
  async cadastrar(data: CadastraCategoriaDto): Promise<ListaCategoriaDto> {
    const categoria = await this.prisma.categoria.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
      },
    });
    return categoria;
  }

  async listarTodas(): Promise<ListaCategoriaDto[]> {
    const categoria = await this.prisma.categoria.findMany();
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async listarPorId(id: string): Promise<ListaCategoriaDto> {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async listarPorNome(nome: string): Promise<ListaCategoriaDto[]> {
    const categoria = await this.prisma.categoria.findMany({
      where: { nome: { contains: nome, mode: 'insensitive' } },
    });
    return plainToInstance(ListaCategoriaDto, categoria);
  }

  async atualizar(
    id: string,
    data: AtualizaCategoriaDto,
  ): Promise<ListaCategoriaDto> {
    const categoria = await this.prisma.categoria.update({
      where: { id },
      data,
    });
    return categoria;
  }

  async remover(id: string) {
    return await this.prisma.categoria.delete({ where: { id } });
  }
}
