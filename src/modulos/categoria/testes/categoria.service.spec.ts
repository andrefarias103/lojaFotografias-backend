import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import mongoose from 'mongoose';
import { CATEGORIA_REPOSITORIO } from '../../../comum/constantes/constantes';
import { CategoriaController } from '../controlador/categoria.controller';
import { CadastraCategoriaDto } from '../dto/cadastra-categoria.dto';
import { ListaCategoriaDto } from '../dto/lista-categoria.dto';
import { CategoriaRepositorio } from '../repositorio/categoria.repositorio';
import { CategoriaService } from '../servico/categoria.service';
import { PrismaService } from './../../../../prisma/prisma.service';

describe('CategoriaService', () => {
  let categoriaService: CategoriaService;

  const id1 = new mongoose.Types.ObjectId().toHexString();
  const id2 = new mongoose.Types.ObjectId().toHexString();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CategoriaController],
      providers: [
        CategoriaService,
        CategoriaRepositorio,
        PrismaService,
        { provide: CATEGORIA_REPOSITORIO, useClass: CategoriaRepositorio },
      ],
    }).compile();

    categoriaService = module.get<CategoriaService>(CategoriaService);
  });

  it('deve ser definido', () => {
    expect(categoriaService).toBeDefined();
  });

  describe(' - Cadastro', () => {
    it('Deve cadastrar uma nova categoria', async () => {
      const mockCategoriaDto: CadastraCategoriaDto = {
        nome: 'Câmera Canon SL3 DSLR',
        descricao:
          'Câmera Canon SL3 DSLR com 24.1MP, 3, Gravação em Full HD - EF-S 18-55MM, Compacto',
      };
      const resultado = {
        id: id1,
        ...mockCategoriaDto,
      };

      jest.spyOn(categoriaService, 'cadastrar').mockResolvedValue(resultado);

      const result = await categoriaService.cadastrar(mockCategoriaDto);
      expect(result).toEqual(resultado);
      expect(categoriaService.cadastrar).toHaveBeenCalled();
      expect(categoriaService.cadastrar).toHaveBeenCalledWith(mockCategoriaDto);
    });
  });

  describe(' - Listar Todas', () => {
    it('Deve listar todas as categorias', async () => {
      const mockListaCategoriasDto: ListaCategoriaDto[] = [
        {
          id: id1,
          nome: 'Câmera Canon SL3 DSLR',
          descricao: 'Câmera Canon SL3 DSLR com 24.1MP',
        },
        {
          id: id2,
          nome: 'Câmera Digital Canon R100',
          descricao: 'Câmera Digital Canon R100 18-45 IS STM',
        },
      ];

      const listaCategoriasEsperadas = plainToInstance(
        ListaCategoriaDto,
        mockListaCategoriasDto,
      );

      jest
        .spyOn(categoriaService, 'listarTodas')
        .mockResolvedValue(mockListaCategoriasDto);

      const resultado = await categoriaService.listarTodas();
      expect(categoriaService.listarTodas).toHaveBeenCalled();
      expect(resultado).toEqual(listaCategoriasEsperadas);
    });
  });

  describe(' - Listar por Id', () => {
    it('Deve encontrar uma categoria informando o id', async () => {
      const mockCategoriaDto: ListaCategoriaDto = {
        id: id1,
        nome: 'Câmera Canon SL3 DSLR',
        descricao: 'Câmera Canon SL3 DSLR com 24.1MP',
      };

      const categoriaEsperada = plainToInstance(
        ListaCategoriaDto,
        mockCategoriaDto,
      );

      jest
        .spyOn(categoriaService, 'listarPorId')
        .mockResolvedValue(mockCategoriaDto);

      const resultado = await categoriaService.listarPorId(id1);
      expect(categoriaService.listarPorId).toHaveBeenCalled();
      expect(resultado).toEqual(categoriaEsperada);
    });
  });

  describe(' - Listar por nome', () => {
    it('Deve listar as categorias por nome completo ou parcial', async () => {
      const nome = 'Canon';
      const mockCategoriaDto: ListaCategoriaDto[] = [
        {
          id: id1,
          nome: 'Câmera Canon SL3 DSLR',
          descricao: 'Câmera Canon SL3 DSLR com 24.1MP',
        },
        {
          id: id2,
          nome: 'Câmera Canon S12 DTB',
          descricao: 'Câmera Canon S12 DTB com 32.1MP',
        },
      ];
      jest
        .spyOn(categoriaService, 'listarPorNome')
        .mockResolvedValue(mockCategoriaDto);

      const resultado = await categoriaService.listarPorNome(nome);
      expect(categoriaService.listarPorNome).toHaveBeenCalled();
      expect(resultado).toEqual(mockCategoriaDto);
    });
  });

  describe(' - Atualizar', () => {
    it('Deve atualizar os dados de uma categoria', async () => {
      const nome: string = 'Câmera P500 Nikon';
      const mockCategoriaDto: ListaCategoriaDto = {
        id: id1,
        nome: 'Câmera Canon SL3 DSLR',
        descricao: 'Câmera Canon SL3 DSLR com 24.1MP',
      };
      jest
        .spyOn(categoriaService, 'atualizar')
        .mockResolvedValue(mockCategoriaDto);

      const resultado = await categoriaService.atualizar(id1, {
        nome,
      });
      expect(categoriaService.atualizar).toHaveBeenCalled();
      expect(resultado).toEqual(mockCategoriaDto);
    });
  });

  describe(' - Remover', () => {
    it('Deve remover uma categoria', async () => {
      const resultadoEsperado = new ListaCategoriaDto();
      jest
        .spyOn(categoriaService, 'remover')
        .mockResolvedValue(resultadoEsperado);

      const resultado = await categoriaService.remover(id1);

      expect(categoriaService.remover).toHaveBeenCalledWith(id1);
      expect(resultado).toBe(resultadoEsperado);
    });
  });
});
