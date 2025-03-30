import React, { useState, useEffect } from 'react';
import { Produto } from '../types/Produto';
import { produtoService } from '../services/produtoService';
import { ProdutoForm } from './ProdutoForm';

export const ProdutoList: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | undefined>();
    const [erro, setErro] = useState<string>('');

    const carregarProdutos = async () => {
        try {
            const data = await produtoService.listar();
            setProdutos(data);
        } catch (error) {
            setErro('Erro ao carregar produtos');
            console.error(error);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleSubmit = async (produto: Omit<Produto, 'id'>) => {
        try {
            if (produtoSelecionado) {
                await produtoService.atualizar(produtoSelecionado.id!, produto);
            } else {
                await produtoService.criar(produto);
            }
            setShowForm(false);
            setProdutoSelecionado(undefined);
            carregarProdutos();
        } catch (error) {
            setErro('Erro ao salvar produto');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await produtoService.deletar(id);
                carregarProdutos();
            } catch (error) {
                setErro('Erro ao excluir produto');
                console.error(error);
            }
        }
    };

    const handleEdit = (produto: Produto) => {
        setProdutoSelecionado(produto);
        setShowForm(true);
    };

    if (showForm) {
        return (
            <div className="container mt-4">
                <ProdutoForm
                    produto={produtoSelecionado}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setProdutoSelecionado(undefined);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Produtos</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Novo Produto
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
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td>R$ {produto.preco}</td>
                                <td>{produto.quantidade_estoque}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEdit(produto)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(produto.id!)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 