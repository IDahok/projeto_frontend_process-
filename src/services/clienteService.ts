import { Cliente } from '../types/Cliente';

const API_URL = `${process.env.REACT_APP_API_URL}/api/clientes`;

export const clienteService = {
    listar: async (): Promise<Cliente[]> => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao listar clientes');
        return response.json();
    },

    obterPorId: async (id: number): Promise<Cliente> => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao obter cliente');
        return response.json();
    },

    criar: async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        if (!response.ok) throw new Error('Erro ao criar cliente');
        return response.json();
    },

    atualizar: async (id: number, cliente: Cliente): Promise<Cliente> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        if (!response.ok) throw new Error('Erro ao atualizar cliente');
        return response.json();
    },

    deletar: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar cliente');
    },
}; 