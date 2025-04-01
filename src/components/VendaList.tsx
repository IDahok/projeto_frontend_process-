import React, { useState, useEffect } from 'react';
import { Venda } from '../types/Venda';
import { Produto } from '../types/Produto';
import { vendaService } from '../services/vendaService';
import { produtoService } from '../services/produtoService';
import { VendaForm } from './VendaForm';

export const VendaList: React.FC = () => {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [vendaSelecionada, setVendaSelecionada] = useState<Venda | undefined>();
    const [erro, setErro] = useState<string>('');

    const carregarDados = async () => {
        try {
            const [vendasData, produtosData] = await Promise.all([
                vendaService.listar(),
                produtoService.listar()
            ]);
            setVendas(vendasData);
            setProdutos(produtosData);
        } catch (error) {
            setErro('Erro ao carregar dados');
            console.error(error);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handleSubmit = async (venda: Omit<Venda, 'id'>) => {
        try {
            if (vendaSelecionada) {
                await vendaService.atualizar(vendaSelecionada.id!, venda);
            } else {
                await vendaService.criar(venda);
            }
            setShowForm(false);
            setVendaSelecionada(undefined);
            carregarDados();
        } catch (error) {
            setErro('Erro ao salvar venda');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
            try {
                await vendaService.deletar(id);
                carregarDados();
            } catch (error) {
                setErro('Erro ao excluir venda');
                console.error(error);
            }
        }
    };

    const handleEdit = (venda: Venda) => {
        setVendaSelecionada(venda);
        setShowForm(true);
    };

    const handleStatusChange = async (id: number, novoStatus: Venda['status']) => {
        try {
            await vendaService.atualizarStatus(id, novoStatus);
            carregarDados();
        } catch (error) {
            setErro('Erro ao atualizar status da venda');
            console.error(error);
        }
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleString('pt-BR');
    };

    const getStatusBadgeClass = (status: Venda['status']) => {
        switch (status) {
            case 'concluida':
                return 'bg-success';
            case 'cancelada':
                return 'bg-danger';
            default:
                return 'bg-warning';
        }
    };

    const getProdutosNomes = (produtoIds: string) => {
        const ids = produtoIds.split(',').map(Number);
        return ids
            .map(id => {
                const produto = produtos.find(p => p.id === id);
                return produto ? produto.nome : '';
            })
            .filter(nome => nome !== '')
            .join(', ');
    };

    if (showForm) {
        return (
            <div className="container mt-4">
                <VendaForm
                    venda={vendaSelecionada}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setVendaSelecionada(undefined);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Vendas</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Nova Venda
                </button>
            </div>

            {erro && (
                <div className="alert alert-danger" role="alert">
                    {erro}
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Produtos</th>
                            <th>Data</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map((venda) => (
                            <tr key={venda.id}>
                                <td>{venda.id}</td>
                                <td>{venda.cliente && venda.cliente.nome}</td>
                                <td>{getProdutosNomes(venda.produto_ids)}</td>
                                <td>{formatarData(venda.data_venda || '')}</td>
                                <td>R$ {venda.valor_total}</td>
                                <td>
                                    <span className={`badge ${venda.status === 'cancelada' ? 'bg-danger' : venda.status === 'concluida' ? 'bg-success' : 'bg-warning'}`}>
                                        {venda.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => handleEdit(venda)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger me-2"
                                            onClick={() => handleDelete(venda.id!)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 