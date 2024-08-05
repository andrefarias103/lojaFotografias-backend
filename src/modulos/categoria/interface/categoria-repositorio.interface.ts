import { AtualizaCategoriaDto } from '../dto/atualiza-categoria.dto';
import { CadastraCategoriaDto } from '../dto/cadastra-categoria.dto';
import { ListaCategoriaDto } from '../dto/lista-categoria.dto';

export interface ICategoriaRepositorio {
  cadastrar(data: CadastraCategoriaDto): Promise<ListaCategoriaDto>;
  listarTodas(): Promise<ListaCategoriaDto[]>;
  listarPorId(id: string): Promise<ListaCategoriaDto>;
  listarPorNome(nome: string): Promise<ListaCategoriaDto[]>;
  atualizar(id: string, data: AtualizaCategoriaDto): Promise<ListaCategoriaDto>;
  remover(id: string);
}
