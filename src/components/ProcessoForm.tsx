import React, { useState, useEffect } from 'react';
import { Processo } from '../types/Processo';
import { Area } from '../types/Area';

interface ProcessoFormProps {
  processo?: Processo;
  areas: Area[];
  processos: Processo[];
  onSubmit: (processo: Omit<Processo, 'id'>) => void;
  onCancel: () => void;
}

const ProcessoForm: React.FC<ProcessoFormProps> = ({
  processo,
  areas,
  processos,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Processo, 'id'>>({
    nome: '',
    descricao: '',
    area_id: 0,
    processo_pai_id: null,
    sistemas: [],
    status: 'ATIVO',
    prioridade: 'MEDIA',
    responsavel: '',
    documentacao: '',
  });

  useEffect(() => {
    if (processo) {
      setFormData({
        nome: processo.nome,
        descricao: processo.descricao,
        area_id: processo.area_id,
        processo_pai_id: processo.processo_pai_id,
        sistemas: processo.sistemas,
        status: processo.status,
        prioridade: processo.prioridade,
        responsavel: processo.responsavel,
        documentacao: processo.documentacao,
      });
    }
  }, [processo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSistemaAdd = () => {
    const sistema = prompt('Digite o nome do sistema:');
    if (sistema) {
      setFormData(prev => ({
        ...prev,
        sistemas: [...prev.sistemas, sistema],
      }));
    }
  };

  const handleSistemaRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sistemas: prev.sistemas.filter((_, i) => i !== index),
    }));
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
        <label className="form-label">Área</label>
        <select
          className="form-select"
          value={formData.area_id}
          onChange={e => setFormData(prev => ({ ...prev, area_id: Number(e.target.value) }))}
          required
        >
          <option value="">Selecione uma área</option>
          {areas.map(area => (
            <option key={area.id} value={area.id}>
              {area.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Processo Pai</label>
        <select
          className="form-select"
          value={formData.processo_pai_id || ''}
          onChange={e => setFormData(prev => ({
            ...prev,
            processo_pai_id: e.target.value ? Number(e.target.value) : null,
          }))}
        >
          <option value="">Nenhum</option>
          {processos
            .filter(p => !processo || p.id !== processo.id)
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={formData.status}
          onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'ATIVO' | 'INATIVO' }))}
          required
        >
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Prioridade</label>
        <select
          className="form-select"
          value={formData.prioridade}
          onChange={e => setFormData(prev => ({ ...prev, prioridade: e.target.value as 'ALTA' | 'MEDIA' | 'BAIXA' }))}
          required
        >
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Média</option>
          <option value="BAIXA">Baixa</option>
        </select>
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

      <div className="mb-3">
        <label className="form-label">Sistemas</label>
        <div className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome do sistema"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSistemaAdd();
              }
            }}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSistemaAdd}
          >
            Adicionar
          </button>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {formData.sistemas.map((sistema, index) => (
            <div key={index} className="badge bg-primary d-flex align-items-center">
              {sistema}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                onClick={() => handleSistemaRemove(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Documentação</label>
        <textarea
          className="form-control"
          value={formData.documentacao}
          onChange={e => setFormData(prev => ({ ...prev, documentacao: e.target.value }))}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {processo ? 'Atualizar' : 'Criar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProcessoForm; 