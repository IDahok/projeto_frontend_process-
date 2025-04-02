import React, { useState } from 'react';
import { Processo } from '../types/Processo';
import { Area } from '../types/Area';

interface ProcessoTreeProps {
  processo: Processo;
  areas: Area[];
  processos: Processo[];
  onEdit: (processo: Processo) => void;
  onDelete: (id: number) => void;
}

const ProcessoTree: React.FC<ProcessoTreeProps> = ({ processo, areas, processos, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!processo || !areas || !processos) {
    return null;
  }

  const getAreaName = (areaId: number) => {
    const area = areas.find(a => a.id === areaId);
    return area ? area.nome : 'Área não encontrada';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'ATIVO':
        return 'bg-success';
      case 'INATIVO':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getPrioridadeBadgeClass = (prioridade: string) => {
    switch (prioridade) {
      case 'ALTA':
        return 'bg-danger';
      case 'MEDIA':
        return 'bg-warning';
      case 'BAIXA':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const subprocessos = processos.filter(p => p.processo_pai_id === processo.id) || [];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-2">
              {subprocessos.length > 0 && (
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              )}
              <h5 className="card-title mb-0">{processo.nome}</h5>
            </div>
            <p className="card-text text-muted mb-2">{processo.descricao}</p>
            <div className="mb-2">
              <span className="badge bg-primary me-2">Área: {getAreaName(processo.area_id)}</span>
              <span className={`badge ${getStatusBadgeClass(processo.status)} me-2`}>
                {processo.status}
              </span>
              <span className={`badge ${getPrioridadeBadgeClass(processo.prioridade)}`}>
                {processo.prioridade}
              </span>
            </div>
            <div className="mb-2">
              <small className="text-muted">
                Responsável: {processo.responsavel}
              </small>
            </div>
            {processo.sistemas && processo.sistemas.length > 0 && (
              <div className="mb-2">
                <small className="text-muted">
                  Sistemas: {processo.sistemas.join(', ')}
                </small>
              </div>
            )}
          </div>
          <div className="btn-group ms-3">
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
        </div>
      </div>

      {isExpanded && subprocessos.length > 0 && (
        <div className="card-body bg-light border-top">
          <h6 className="mb-3">Subprocessos:</h6>
          {subprocessos.map(subprocesso => (
            <ProcessoTree
              key={subprocesso.id}
              processo={subprocesso}
              areas={areas}
              processos={processos}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProcessoTree; 