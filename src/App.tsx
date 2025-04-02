import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Area } from './types/Area';
import { Processo } from './types/Processo';
import AreaListComponent from './components/AreaListComponent';
import ProcessoTree from './components/ProcessoTree';
import ProcessoForm from './components/ProcessoForm';
import ProcessoListComponent from './components/ProcessoListComponent';
import AreaForm from './components/AreaForm';
import {
  getAreas,
  getProcessos,
  createArea,
  updateArea,
  deleteArea,
  createProcesso,
  updateProcesso,
  deleteProcesso,
} from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArea, setEditingArea] = useState<Area | undefined>();
  const [editingProcess, setEditingProcess] = useState<Processo | undefined>();
  const [selectedArea, setSelectedArea] = useState<number | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [areasData, processosData] = await Promise.all([
        getAreas(),
        getProcessos(),
      ]);

      setAreas(areasData);
      setProcessos(processosData);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAreaSubmit = async (areaData: Omit<Area, 'id'>) => {
    try {
      if (editingArea) {
        await updateArea(editingArea.id, areaData);
      } else {
        await createArea(areaData);
      }
      await fetchData();
      setEditingArea(undefined);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleProcessSubmit = async (processoData: Omit<Processo, 'id'>) => {
    try {
      if (editingProcess) {
        await updateProcesso(editingProcess.id, processoData);
      } else {
        await createProcesso(processoData);
      }
      await fetchData();
      setEditingProcess(undefined);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleEditArea = (area: Area) => {
    setEditingArea(area);
  };

  const handleEditProcess = (processo: Processo) => {
    setEditingProcess(processo);
  };

  const handleDeleteArea = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta área?')) {
      try {
        await deleteArea(id);
        await fetchData();
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  const handleDeleteProcess = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este processo?')) {
      try {
        await deleteProcesso(id);
        await fetchData();
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  const filteredProcessos = selectedArea
    ? processos.filter(p => p.area_id === selectedArea)
    : processos;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">Gestão de Processos</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/areas">Áreas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/processos">Processos</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/areas" element={
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Áreas</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingArea({
                      id: 0,
                      nome: '',
                      descricao: '',
                      responsavel: ''
                    })}
                  >
                    Nova Área
                  </button>
                </div>
                {editingArea && (
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        {editingArea.id ? 'Editar Área' : 'Nova Área'}
                      </h5>
                    </div>
                    <div className="card-body">
                      <AreaForm
                        area={editingArea}
                        onSubmit={handleAreaSubmit}
                        onCancel={() => setEditingArea(undefined)}
                      />
                    </div>
                  </div>
                )}
                <AreaListComponent
                  areas={areas}
                  onEdit={handleEditArea}
                  onDelete={handleDeleteArea}
                />
              </div>
            } />
            <Route path="/processos" element={
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Processos</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingProcess({
                      id: 0,
                      nome: '',
                      descricao: '',
                      area_id: 0,
                      processo_pai_id: null,
                      sistemas: [],
                      status: 'ATIVO',
                      prioridade: 'MEDIA',
                      responsavel: '',
                      documentacao: ''
                    })}
                  >
                    Novo Processo
                  </button>
                </div>

                <div className="mb-4">
                  <select
                    className="form-select"
                    value={selectedArea || ''}
                    onChange={e => setSelectedArea(e.target.value ? Number(e.target.value) : undefined)}
                  >
                    <option value="">Todas as áreas</option>
                    {areas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {editingProcess && (
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        {editingProcess.id ? 'Editar Processo' : 'Novo Processo'}
                      </h5>
                    </div>
                    <div className="card-body">
                      <ProcessoForm
                        processo={editingProcess}
                        areas={areas}
                        processos={processos}
                        onSubmit={handleProcessSubmit}
                        onCancel={() => setEditingProcess(undefined)}
                      />
                    </div>
                  </div>
                )}

                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Lista de Processos</h5>
                  </div>
                  <div className="card-body">
                    <ProcessoListComponent
                      processos={processos}
                      onEdit={setEditingProcess}
                      onDelete={handleDeleteProcess}
                    />
                  </div>
                </div>

                <div className="processos-tree">
                  {filteredProcessos
                    .filter(p => !p.processo_pai_id)
                    .map(processo => (
                      <ProcessoTree
                        key={processo.id}
                        processo={processo}
                        areas={areas}
                        processos={processos}
                        onEdit={handleEditProcess}
                        onDelete={handleDeleteProcess}
                      />
                    ))}
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 