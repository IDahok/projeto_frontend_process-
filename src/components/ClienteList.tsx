import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';
import { clienteService } from '../services/clienteService';
import { ClienteForm } from './ClienteForm';

export const ClienteList: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | undefined>();
    const [erro, setErro] = useState<string>('');

    const carregarClientes = async () => {
        try {
            const data = await clienteService.listar();
            setClientes(data);
        } catch (error) {
            setErro('Erro ao carregar clientes');
            console.error(error);
        }
    };

    useEffect(() => {
        carregarClientes();
    }, []);

    const handleSubmit = async (cliente: Omit<Cliente, 'id'>) => {
        try {
            if (clienteSelecionado) {
                await clienteService.atualizar(clienteSelecionado.id!, cliente);
            } else {
                await clienteService.criar(cliente);
            }
            setShowForm(false);
            setClienteSelecionado(undefined);
            carregarClientes();
        } catch (error) {
            setErro('Erro ao salvar cliente');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await clienteService.deletar(id);
                carregarClientes();
            } catch (error) {
                setErro('Erro ao excluir cliente');
                console.error(error);
            }
        }
    };

    const handleEdit = (cliente: Cliente) => {
        setClienteSelecionado(cliente);
        setShowForm(true);
    };

    if (showForm) {
        return (
            <div className="container mt-4">
                <ClienteForm
                    cliente={clienteSelecionado}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setClienteSelecionado(undefined);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Clientes</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Novo Cliente
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
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.endereco}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEdit(cliente)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(cliente.id!)}
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