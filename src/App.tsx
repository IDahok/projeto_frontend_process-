import React, { useState } from 'react';
import { ProdutoList } from './components/ProdutoList';
import { ClienteList } from './components/ClienteList';
import { VendaList } from './components/VendaList';
import { RelatorioVendas } from './components/RelatorioVendas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const [secaoAtiva, setSecaoAtiva] = useState('produtos');

  const renderizarConteudo = () => {
    switch (secaoAtiva) {
      case 'produtos':
        return <ProdutoList />;
      case 'clientes':
        return <ClienteList />;
      case 'vendas':
        return <VendaList />;
      case 'relatorio':
        return <RelatorioVendas />;
      default:
        return <ProdutoList />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); setSecaoAtiva('produtos'); }}>Sistema de Vendas</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className={`nav-link ${secaoAtiva === 'produtos' ? 'active' : ''}`} 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setSecaoAtiva('produtos'); }}>
                  Produtos
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${secaoAtiva === 'clientes' ? 'active' : ''}`} 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setSecaoAtiva('clientes'); }}>
                  Clientes
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${secaoAtiva === 'vendas' ? 'active' : ''}`} 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setSecaoAtiva('vendas'); }}>
                  Vendas
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${secaoAtiva === 'relatorio' ? 'active' : ''}`} 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setSecaoAtiva('relatorio'); }}>
                  Relatório
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {renderizarConteudo()}
      </div>
    </div>
  );
}

export default App; 