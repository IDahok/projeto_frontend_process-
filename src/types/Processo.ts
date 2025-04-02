export interface Processo {
  id: number;
  nome: string;
  descricao: string;
  area_id: number;
  processo_pai_id: number | null;
  sistemas: string[];
  status: 'ATIVO' | 'INATIVO';
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  responsavel: string;
  documentacao: string;
} 