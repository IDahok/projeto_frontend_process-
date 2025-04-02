import React from 'react';
import { Processo } from '../types/Processo';

interface ProcessoListComponentProps {
  processos: Processo[];
  onEdit: (processo: Processo) => void;
  onDelete: (id: number) => void;
}

const ProcessoListComponent: React.FC<ProcessoListComponentProps> = ({ processos, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map(processo => (
            <tr key={processo.id}>
              <td>{processo.nome}</td>
              <td>{processo.descricao}</td>
              <td>
                <span className={`badge bg-${processo.status === 'ATIVO' ? 'success' : 'danger'}`}>
                  {processo.status}
                </span>
              </td>
              <td>
                <span className={`badge bg-${processo.prioridade === 'ALTA' ? 'danger' : processo.prioridade === 'MEDIA' ? 'warning' : 'info'}`}>
                  {processo.prioridade}
                </span>
              </td>
              <td>{processo.responsavel}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(processo)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(processo.id)}
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
  );
};

export default ProcessoListComponent; 