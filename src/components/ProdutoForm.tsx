import React, { useState, useEffect } from 'react';
import { Produto } from '../types/Produto';

interface ProdutoFormProps {
    produto?: Produto;
    onSubmit: (produto: Omit<Produto, 'id'>) => void;
    onCancel: () => void;
}

export const ProdutoForm: React.FC<ProdutoFormProps> = ({ produto, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Produto, 'id'>>({
        nome: '',
        descricao: '',
        preco: 0,
        quantidade_estoque: 0,
    });

    useEffect(() => {
        if (produto) {
            setFormData({
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                quantidade_estoque: produto.quantidade_estoque,
            });
        }
    }, [produto]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'preco' || name === 'quantidade_estoque' ? Number(value) : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4">
            <h3 className="mb-4">{produto ? 'Editar Produto' : 'Novo Produto'}</h3>
            
            <div className="form-group mb-3">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                    className="form-control"
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="preco">Preço</label>
                <input
                    type="number"
                    className="form-control"
                    id="preco"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="quantidade">Quantidade</label>
                <input
                    type="number"
                    className="form-control"
                    id="quantidade_estoque"
                    name="quantidade_estoque"
                    value={formData.quantidade_estoque}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {produto ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}; 