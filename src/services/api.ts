import { Area } from '../types/Area';
import { Processo } from '../types/Processo';

const API_URL = 'http://localhost:8080/api';

// Áreas
export const getAreas = async (): Promise<Area[]> => {
  const response = await fetch(`${API_URL}/areas`);
  if (!response.ok) throw new Error('Erro ao buscar áreas');
  return response.json();
};

export const getAreaById = async (id: number): Promise<Area> => {
  const response = await fetch(`${API_URL}/areas/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar área');
  return response.json();
};

export const createArea = async (area: Omit<Area, 'id'>): Promise<Area> => {
  const response = await fetch(`${API_URL}/areas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(area),
  });
  if (!response.ok) throw new Error('Erro ao criar área');
  return response.json();
};

export const updateArea = async (id: number, area: Omit<Area, 'id'>): Promise<Area> => {
  const response = await fetch(`${API_URL}/areas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(area),
  });
  if (!response.ok) throw new Error('Erro ao atualizar área');
  return response.json();
};

export const deleteArea = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/areas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao excluir área');
};

// Processos
export const getProcessos = async (): Promise<Processo[]> => {
  const response = await fetch(`${API_URL}/processos`);
  if (!response.ok) throw new Error('Erro ao buscar processos');
  return response.json();
};

export const getProcessoById = async (id: number): Promise<Processo> => {
  const response = await fetch(`${API_URL}/processos/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar processo');
  return response.json();
};

export const getProcessosArvore = async (areaId?: number, processoId?: number): Promise<Processo[]> => {
  let url = `${API_URL}/processos/arvore`;
  if (areaId) url += `/${areaId}`;
  if (processoId) url += `/${processoId}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar árvore de processos');
  return response.json();
};

export const createProcesso = async (processo: Omit<Processo, 'id'>): Promise<Processo> => {
  const response = await fetch(`${API_URL}/processos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(processo),
  });
  if (!response.ok) throw new Error('Erro ao criar processo');
  return response.json();
};

export const updateProcesso = async (id: number, processo: Omit<Processo, 'id'>): Promise<Processo> => {
  const response = await fetch(`${API_URL}/processos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(processo),
  });
  if (!response.ok) throw new Error('Erro ao atualizar processo');
  return response.json();
};

export const deleteProcesso = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/processos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao excluir processo');
}; 