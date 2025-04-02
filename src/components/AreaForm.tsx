import React, { useState, useEffect } from 'react';
import { Area } from '../types/Area';

interface AreaFormProps {
  area?: Area;
  onSubmit: (area: Omit<Area, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => void;
  onCancel: () => void;
}

const AreaForm: React.FC<AreaFormProps> = ({ area, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    responsavel: '',
  });

  useEffect(() => {
    if (area) {
      setFormData({
        nome: area.nome,
        descricao: area.descricao,
        responsavel: area.responsavel,
      });
    }
  }, [area]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome da Área</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição</label>
        <textarea
          className="form-control"
          id="descricao"
          rows={3}
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="responsavel" className="form-label">Responsável</label>
        <input
          type="text"
          className="form-control"
          id="responsavel"
          value={formData.responsavel}
          onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
          required
        />
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {area ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default AreaForm; 