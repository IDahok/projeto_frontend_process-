import React, { useState, useEffect } from 'react';
import { Venda } from '../types/Venda';
import { Produto } from '../types/Produto';
import { vendaService } from '../services/vendaService';
import { produtoService } from '../services/produtoService';

export const RelatorioVendas: React.FC = () => {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [erro, setErro] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const carregarDados = async () => {
        try {
            setLoading(true);
            setErro('');
            const [vendasData, produtosData] = await Promise.all([
                vendaService.listar(),
                produtoService.listar()
            ]);
            setVendas(vendasData);
            setProdutos(produtosData);
        } catch (error) {
            setErro('Erro ao carregar dados');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const formatarData = (data: string) => {
        return new Date(data).toLocaleString('pt-BR');
    };

    const formatarValor = (valor: number | string | undefined) => {
        if (valor === undefined || valor === null) return '0,00';
        const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
        return isNaN(numero) ? '0,00' : numero.toFixed(2).replace('.', ',');
    };

    const getProdutosNomes = (produtoIds: string) => {
        return produtoIds
            .split(',')
            .map(id => {
                const produto = produtos.find(p => p.id === parseInt(id));
                return produto ? produto.nome : '';
            })
            .filter(nome => nome !== '')
            .join(', ');
    };

    const getClienteNome = (venda: Venda) => {
        return venda.cliente && venda.cliente.nome ? venda.cliente.nome : '';
    };

    const exportarCSV = () => {
        try {
            const csv = [
                ['ID', 'Data', 'Cliente', 'Produtos', 'Valor Total', 'Status'],
                ...vendas.map(venda => [
                    venda.id,
                    formatarData(venda.data_venda || ''),
                    getClienteNome(venda),
                    getProdutosNomes(venda.produto_ids),
                    formatarValor(venda.valor_total),
                    venda.status
                ])
            ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `relatorio_vendas_${formatarData(new Date().toISOString())}.csv`;
            link.click();
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            setErro('Erro ao gerar relatório. Tente novamente.');
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Relatório Detalhado de Vendas</h2>
                <button 
                    className="btn btn-success"
                    onClick={exportarCSV}
                >
                    <i className="fa fa-download me-2"></i>
                    Exportar CSV
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
                            <th>Data</th>
                            <th>Cliente</th>
                            <th>Produtos</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map((venda) => (
                            <tr key={venda.id}>
                                <td>{venda.id}</td>
                                <td>{formatarData(venda.data_venda || '')}</td>
                                <td>{getClienteNome(venda)}</td>
                                <td>{getProdutosNomes(venda.produto_ids)}</td>
                                <td>R$ {formatarValor(venda.valor_total)}</td>
                                <td>
                                    <span className={`badge ${venda.status === 'concluida' ? 'bg-success' : 'bg-warning'}`}>
                                        {venda.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 