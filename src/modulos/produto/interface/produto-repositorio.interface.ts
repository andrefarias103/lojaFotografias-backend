import { AtualizaProdutoDto } from '../dto/atualiza-produto.dto';
import { CadastraProdutoDto } from '../dto/cadastra-produto.dto';
import { ListaProdutoDto } from '../dto/lista-produto.dto';

export interface IProdutoRepositorio {
  cadastrar(data: CadastraProdutoDto): Promise<ListaProdutoDto>;
  listarTodas(): Promise<ListaProdutoDto[]>;
  listarPorId(id: string): Promise<ListaProdutoDto>;
  listarPorNome(nome: string): Promise<ListaProdutoDto[]>;
  atualizar(id: string, data: AtualizaProdutoDto): Promise<ListaProdutoDto>;
  remover(id: string);
}
