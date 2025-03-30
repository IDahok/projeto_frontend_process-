export interface Venda {
    id?: number;
    cliente_id: number;
    data_venda?: string;
    valor_total: number;
    produto_ids: string;
    status: 'pendente' | 'concluida' | 'cancelada';
    cliente?: {
        nome: string;
    };
} 