import React, { useState, useEffect } from 'react';
import { Venda } from '../types/Venda';
import { Cliente } from '../types/Cliente';
import { Produto } from '../types/Produto';
import { clienteService } from '../services/clienteService';
import { produtoService } from '../services/produtoService';

interface VendaFormProps {
    venda?: Venda;
    onSubmit: (venda: Omit<Venda, 'id'>) => void;
    onCancel: () => void;
}

export const VendaForm: React.FC<VendaFormProps> = ({ venda, onSubmit, onCancel }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [formData, setFormData] = useState<Omit<Venda, 'id'>>({
        cliente_id: 0,
        valor_total: 0,
        produto_ids: '',
        status: 'pendente',
    });

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [clientesData, produtosData] = await Promise.all([
                    clienteService.listar(),
                    produtoService.listar()
                ]);
                setClientes(clientesData);
                setProdutos(produtosData);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);

    useEffect(() => {
        if (venda) {
            setFormData({
                cliente_id: venda.cliente_id,
                valor_total: venda.valor_total,
                produto_ids: venda.produto_ids,
                status: venda.status,
            });
        }
    }, [venda]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'valor_total' ? Number(value) : value,
        }));
    };

    const handleProdutoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            produto_ids: selectedOptions.join(','),
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4">
            <h3 className="mb-4">{venda ? 'Editar Venda' : 'Nova Venda'}</h3>
            
            <div className="form-group mb-3">
                <label htmlFor="cliente_id">Cliente</label>
                <select
                    className="form-control"
                    id="cliente_id"
                    name="cliente_id"
                    value={formData.cliente_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="produto_ids">Produtos</label>
                <select
                    className="form-control"
                    id="produto_ids"
                    name="produto_ids"
                    multiple
                    value={formData.produto_ids.split(',').filter(Boolean)}
                    onChange={handleProdutoChange}
                    required
                >
                    {produtos.map(produto => (
                        <option key={produto.id} value={produto.id}>
                            {produto.nome} - R$ {produto.preco}
                        </option>
                    ))}
                </select>
                <small className="form-text text-muted">
                    Mantenha a tecla Ctrl pressionada para selecionar múltiplos produtos
                </small>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="valor_total">Valor Total</label>
                <input
                    type="number"
                    className="form-control"
                    id="valor_total"
                    name="valor_total"
                    value={formData.valor_total}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="status">Status</label>
                <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="pendente">Pendente</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                </select>
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {venda ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}; 