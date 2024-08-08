import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import mongoose from 'mongoose';
import { PRODUTO_REPOSITORIO } from '../../../comum/constantes/constantes';
import { ProdutoController } from '../controlador/produto.controller';
import { CadastraProdutoDto } from '../dto/cadastra-produto.dto';
import { ListaProdutoDto } from '../dto/lista-produto.dto';
import { ProdutoRepositorio } from '../repositorio/produto.repositorio';
import { ProdutoService } from '../servico/produto.service';
import { PrismaService } from './../../../../prisma/prisma.service';

describe('ProdutoService', () => {
  let produtoService: ProdutoService;

  const id1 = new mongoose.Types.ObjectId().toHexString();
  const id2 = new mongoose.Types.ObjectId().toHexString();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProdutoController],
      providers: [
        ProdutoService,
        ProdutoRepositorio,
        PrismaService,
        { provide: PRODUTO_REPOSITORIO, useClass: ProdutoRepositorio },
      ],
    }).compile();

    produtoService = module.get<ProdutoService>(ProdutoService);
  });

  it('deve ser definido', () => {
    expect(produtoService).toBeDefined();
  });

  describe(' - Cadastro', () => {
    it('Deve cadastrar uma nova produto', async () => {
      const mockProdutoDto: CadastraProdutoDto = {
        nome: 'Câmera Fotográfica Digital Canon EOS R5',
        descricao:
          'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
        preco: '5.525,64',
        estoque: 50,
        imagem: '',
        categoriaId: '66b3bc6b11202403e30f297e',
      };
      const resultado = {
        id: id1,
        ...mockProdutoDto,
      };

      jest.spyOn(produtoService, 'cadastrar').mockResolvedValue(resultado);

      const result = await produtoService.cadastrar(mockProdutoDto);
      expect(result).toEqual(resultado);
      expect(produtoService.cadastrar).toHaveBeenCalled();
      expect(produtoService.cadastrar).toHaveBeenCalledWith(mockProdutoDto);
    });
  });

  describe(' - Listar Todas', () => {
    it('Deve listar todas as produtos', async () => {
      const mockListaProdutosDto: ListaProdutoDto[] = [
        {
          id: id1,
          nome: 'Câmera Fotográfica Digital Canon EOS R5',
          descricao:
            'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
          preco: '5.525,64',
          estoque: 50,
          imagem: '',
          categoriaId: '66b3bc6b11202403e30f297e',
        },
        {
          id: id2,
          nome: 'Câmera Digital Canon R100',
          descricao: 'Câmera Digital Canon R100 18-45 IS STM',
          preco: '3.299,00',
          estoque: 50,
          imagem: '',
          categoriaId: '66b3bc6b11202403e30f297e',
        },
      ];

      const listaProdutosEsperadas = plainToInstance(
        ListaProdutoDto,
        mockListaProdutosDto,
      );

      jest
        .spyOn(produtoService, 'listarTodas')
        .mockResolvedValue(mockListaProdutosDto);

      const resultado = await produtoService.listarTodas();
      expect(produtoService.listarTodas).toHaveBeenCalled();
      expect(resultado).toEqual(listaProdutosEsperadas);
    });
  });

  describe(' - Listar por Id', () => {
    it('Deve encontrar uma produto informando o id', async () => {
      const mockProdutoDto: ListaProdutoDto = {
        id: id1,
        nome: 'Câmera Fotográfica Digital Canon EOS R5',
        descricao:
          'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
        preco: '5.525,64',
        estoque: 50,
        imagem: '',
        categoriaId: '66b3bc6b11202403e30f297e',
      };

      const produtoEsperada = plainToInstance(ListaProdutoDto, mockProdutoDto);

      jest
        .spyOn(produtoService, 'listarPorId')
        .mockResolvedValue(mockProdutoDto);

      const resultado = await produtoService.listarPorId(id1);
      expect(produtoService.listarPorId).toHaveBeenCalled();
      expect(resultado).toEqual(produtoEsperada);
    });
  });

  describe(' - Listar por nome', () => {
    it('Deve listar as produtos por nome completo ou parcial', async () => {
      const nome = 'Canon';
      const mockProdutoDto: ListaProdutoDto[] = [
        {
          id: id1,
          nome: 'Câmera Fotográfica Digital Canon EOS R5',
          descricao:
            'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
          preco: '5.525,64',
          estoque: 50,
          imagem: '',
          categoriaId: '66b3bc6b11202403e30f297e',
        },
        {
          id: id2,
          nome: 'Câmera Digital Canon R100',
          descricao: 'Câmera Digital Canon R100 18-45 IS STM',
          preco: '3.299,00',
          estoque: 50,
          imagem: '',
          categoriaId: '66b3bc6b11202403e30f297e',
        },
      ];
      jest
        .spyOn(produtoService, 'listarPorNome')
        .mockResolvedValue(mockProdutoDto);

      const resultado = await produtoService.listarPorNome(nome);
      expect(produtoService.listarPorNome).toHaveBeenCalled();
      expect(resultado).toEqual(mockProdutoDto);
    });
  });

  describe(' - Atualizar', () => {
    it('Deve atualizar os dados de uma produto', async () => {
      const nome: string = 'Câmera P500 Nikon';
      const mockProdutoDto: ListaProdutoDto = {
        id: id1,
        nome: 'Câmera Fotográfica Digital Canon EOS R5',
        descricao:
          'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
        preco: '5.525,64',
        estoque: 50,
        imagem: '',
        categoriaId: '66b3bc6b11202403e30f297e',
      };
      jest.spyOn(produtoService, 'atualizar').mockResolvedValue(mockProdutoDto);

      const resultado = await produtoService.atualizar(id1, {
        nome,
      });
      expect(produtoService.atualizar).toHaveBeenCalled();
      expect(resultado).toEqual(mockProdutoDto);
    });
  });

  describe(' - Remover', () => {
    it('Deve remover uma produto', async () => {
      const resultadoEsperado = new ListaProdutoDto();
      jest
        .spyOn(produtoService, 'remover')
        .mockResolvedValue(resultadoEsperado);

      const resultado = await produtoService.remover(id1);

      expect(produtoService.remover).toHaveBeenCalledWith(id1);
      expect(resultado).toBe(resultadoEsperado);
    });
  });
});
