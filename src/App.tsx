import React from 'react';
import { ProdutoList } from './components/ProdutoList';
import { ClienteList } from './components/ClienteList';
import { VendaList } from './components/VendaList';
import { RelatorioVendas } from './components/RelatorioVendas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Sistema de Vendas</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#produtos">Produtos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#clientes">Clientes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#vendas">Vendas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#relatorio">Relatório</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div id="produtos">
          <ProdutoList />
        </div>
        <div id="clientes" className="mt-5">
          <ClienteList />
        </div>
        <div id="vendas" className="mt-5">
          <VendaList />
        </div>
        <div id="relatorio" className="mt-5">
          <RelatorioVendas />
        </div>
      </div>
    </div>
  );
}

export default App; 