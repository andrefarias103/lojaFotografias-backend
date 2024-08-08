import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AppModule } from '../../../app.module';
import { CATEGORIA_REPOSITORIO } from '../../../comum/constantes/constantes';
import { CategoriaController } from '../controlador/categoria.controller';
import { CategoriaRepositorio } from '../repositorio/categoria.repositorio';
import { CategoriaService } from '../servico/categoria.service';

describe('CategoriaController', () => {
  let categoriaController: CategoriaController;
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
      controllers: [CategoriaController],
      providers: [
        CategoriaService,
        CategoriaRepositorio,
        PrismaService,
        { provide: CATEGORIA_REPOSITORIO, useClass: CategoriaRepositorio },
      ],
    }).compile();

    categoriaController = module.get<CategoriaController>(CategoriaController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve ser definido', () => {
    expect(categoriaController).toBeDefined();
  });

  describe(' - Cadastro', () => {
    it('Deve cadastrar uma nova categoria', async () => {
      const response = await request(app.getHttpServer())
        .post('/categoria')
        .send({
          nome: 'Câmera Canon SL3 DSLR',
          descricao:
            'Câmera Canon SL3 DSLR com 24.1MP, 3, Gravação em Full HD - EF-S 18-55MM, Compacto',
        })
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        nome: 'Câmera Canon SL3 DSLR',
      });
    });
  });

  describe(' - ListarTodas', () => {
    it('Deve listar todas categorias', async () => {
      await request(app.getHttpServer())
        .get('/categoria')
        .set('Accept', 'application/json/')
        .expect(200);
    });
  });

  describe(' - Remover', () => {
    it('Deve remover uma categoria', async () => {
      const responseCadastro = await request(app.getHttpServer())
        .post('/categoria')
        .send({
          nome: 'Câmera Canon SL3 DSLR',
          descricao:
            'Câmera Canon SL3 DSLR com 24.1MP, 3, Gravação em Full HD - EF-S 18-55MM, Compacto',
        })
        .expect(201);

      const idResposta = responseCadastro.body.id;

      await request(app.getHttpServer())
        .delete(`/categoria/${idResposta}`)
        .set('Accept', 'application/json/')
        .expect(200);
    });
  });
});
