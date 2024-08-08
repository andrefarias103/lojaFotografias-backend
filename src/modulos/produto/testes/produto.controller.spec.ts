import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AppModule } from '../../../app.module';
import { PRODUTO_REPOSITORIO } from '../../../comum/constantes/constantes';
import { ProdutoController } from '../controlador/produto.controller';
import { ProdutoRepositorio } from '../repositorio/produto.repositorio';
import { ProdutoService } from '../servico/produto.service';

describe('ProdutoController', () => {
  let produtoController: ProdutoController;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

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

    produtoController = module.get<ProdutoController>(ProdutoController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve ser definido', () => {
    expect(produtoController).toBeDefined();
  });

  describe(' - Cadastro', () => {
    it('Deve cadastrar uma nova produto', async () => {
      const response = await request(app.getHttpServer())
        .post('/produto')
        .send({
          nome: 'Câmera Fotográfica Digital Canon EOS R5',
          descricao:
            'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
          preco: '5.525,64',
          estoque: 50,
          imagem: '',
          categoriaId: '66b3bc6b11202403e30f297e',
        })
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        nome: 'Câmera Fotográfica Digital Canon EOS R5',
      });
    });
  });

  describe(' - ListarTodas', () => {
    it('Deve listar todas produtos', async () => {
      await request(app.getHttpServer())
        .get('/produto')
        .set('Accept', 'application/json/')
        .expect(200);
    });
  });

  describe(' - Remover', () => {
    it('Deve remover uma produto', async () => {
      const responseCadastro = await request(app.getHttpServer())
        .post('/produto')
        .send({
          nome: 'Câmera Fotográfica Digital Canon EOS R5',
          descricao:
            'Câmera Fotográfica Digital Canon EOS R5 Mirrorless com Lente RF 24-105mm f/4 L IS USM Preta',
          preco: '5.525,64',
          estoque: 50,
          imagem: '',
          categoriaId: '66b3bc6b11202403e30f297e',
        })
        .expect(201);

      const idResposta = responseCadastro.body.id;

      await request(app.getHttpServer())
        .delete(`/produto/${idResposta}`)
        .set('Accept', 'application/json/')
        .expect(200);
    });
  });
});
