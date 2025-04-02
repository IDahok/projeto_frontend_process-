import React, { useState, useEffect } from 'react';
import { Area } from '../types/Area';

interface AreaFormProps {
  area?: Area;
  onSubmit: (area: Omit<Area, 'id'>) => void;
  onCancel: () => void;
}

const AreaForm: React.FC<AreaFormProps> = ({ area, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Area, 'id'>>({
    nome: '',
    descricao: '',
    responsavel: ''
  });

  useEffect(() => {
    if (area) {
      setFormData({
        nome: area.nome,
        descricao: area.descricao,
        responsavel: area.responsavel
      });
    }
  }, [area]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      alert('O nome da área é obrigatório');
      return;
    }
    if (!formData.responsavel.trim()) {
      alert('O responsável é obrigatório');
      return;
    }

    // Garante que os campos tenham valores válidos antes de enviar
    const dataToSubmit = {
      ...formData,
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim(),
      responsavel: formData.responsavel.trim()
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          value={formData.nome}
          onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea
          className="form-control"
          value={formData.descricao}
          onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Responsável</label>
        <input
          type="text"
          className="form-control"
          value={formData.responsavel}
          onChange={e => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AreaForm; 