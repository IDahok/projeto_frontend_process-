import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';

interface ClienteFormProps {
    cliente?: Cliente;
    onSubmit: (cliente: Omit<Cliente, 'id'>) => void;
    onCancel: () => void;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Cliente, 'id'>>({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
    });

    useEffect(() => {
        if (cliente) {
            setFormData({
                nome: cliente.nome,
                email: cliente.email,
                telefone: cliente.telefone,
                endereco: cliente.endereco,
            });
        }
    }, [cliente]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4">
            <h3 className="mb-4">{cliente ? 'Editar Cliente' : 'Novo Cliente'}</h3>
            
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
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="telefone">Telefone</label>
                <input
                    type="tel"
                    className="form-control"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="endereco">Endereço</label>
                <textarea
                    className="form-control"
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {cliente ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}; 