import { Venda } from '../types/Venda';
import { produtoService } from './produtoService';
import { clienteService } from './clienteService';

const API_URL = `${process.env.REACT_APP_API_URL}/api/vendas`;

export const vendaService = {
    listar: async (): Promise<Venda[]> => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao listar vendas');
        const vendas = await response.json();
        
        // Busca os dados dos clientes para cada venda
        const vendasComClientes = await Promise.all<Venda>(
            vendas.map(async (venda: Venda): Promise<Venda> => {
                try {
                    const cliente = await clienteService.obterPorId(venda.cliente_id);
                    return {
                        ...venda,
                        cliente: { nome: cliente.nome }
                    };
                } catch (error) {
                    console.error(`Erro ao buscar cliente ${venda.cliente_id}:`, error);
                    return {
                        ...venda,
                        cliente: { nome: 'Cliente não encontrado' }
                    };
                }
            })
        );

        return vendasComClientes;
    },

    obterPorId: async (id: number): Promise<Venda> => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao obter venda');
        const venda = await response.json();
        
        try {
            const cliente = await clienteService.obterPorId(venda.cliente_id);
            return {
                ...venda,
                cliente: { nome: cliente.nome }
            };
        } catch (error) {
            console.error(`Erro ao buscar cliente ${venda.cliente_id}:`, error);
            return {
                ...venda,
                cliente: { nome: 'Cliente não encontrado' }
            };
        }
    },

    criar: async (venda: Omit<Venda, 'id'>): Promise<Venda> => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...venda,
                    cliente_id: venda.cliente_id
                }),
            });
            if (!response.ok) throw new Error('Erro ao criar venda');
            const novaVenda = await response.json();
            
            // Busca os dados do cliente
            const cliente = await clienteService.obterPorId(novaVenda.cliente_id);
            return {
                ...novaVenda,
                cliente: { nome: cliente.nome }
            };
        } catch (error) {
            console.error('Erro ao criar venda:', error);
            throw error;
        }
    },

    atualizar: async (id: number, venda: Venda): Promise<Venda> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...venda,
                cliente_id: venda.cliente_id
            }),
        });
        if (!response.ok) throw new Error('Erro ao atualizar venda');
        const vendaAtualizada = await response.json();
        
        // Busca os dados do cliente
        const cliente = await clienteService.obterPorId(vendaAtualizada.cliente_id);
        return {
            ...vendaAtualizada,
            cliente: { nome: cliente.nome }
        };
    },

    deletar: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar venda');
    },

    atualizarStatus: async (id: number, status: Venda['status']): Promise<Venda> => {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Erro ao atualizar status da venda');
        const vendaAtualizada = await response.json();
        
        // Busca os dados do cliente
        const cliente = await clienteService.obterPorId(vendaAtualizada.cliente_id);
        return {
            ...vendaAtualizada,
            cliente: { nome: cliente.nome }
        };
    },
}; 