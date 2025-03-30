import { Venda } from '../types/Venda';

const API_URL = `${process.env.REACT_APP_API_URL}/api/vendas`;

export const vendaService = {
    listar: async (): Promise<Venda[]> => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao listar vendas');
        return response.json();
    },

    obterPorId: async (id: number): Promise<Venda> => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao obter venda');
        return response.json();
    },

    criar: async (venda: Omit<Venda, 'id'>): Promise<Venda> => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venda),
        });
        if (!response.ok) throw new Error('Erro ao criar venda');
        return response.json();
    },

    atualizar: async (id: number, venda: Venda): Promise<Venda> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venda),
        });
        if (!response.ok) throw new Error('Erro ao atualizar venda');
        return response.json();
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
        return response.json();
    },
}; 