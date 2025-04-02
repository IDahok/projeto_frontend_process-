import React from 'react';
import { Area } from '../types/Area';

interface AreaListComponentProps {
  areas: Area[];
  onEdit: (area: Area) => void;
  onDelete: (id: number) => void;
}

const AreaListComponent: React.FC<AreaListComponentProps> = ({ areas, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {areas.map(area => (
            <tr key={area.id}>
              <td>{area.nome}</td>
              <td>{area.descricao}</td>
              <td>{area.responsavel}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(area)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(area.id)}
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

export default AreaListComponent; 