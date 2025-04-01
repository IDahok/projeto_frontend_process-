# Sistema de Vendas

Sistema de gerenciamento de vendas desenvolvido com React.js e TypeScript, permitindo o controle de produtos, clientes, vendas e geração de relatórios.

## Funcionalidades

- **Produtos**: Cadastro, listagem, edição e exclusão de produtos
- **Clientes**: Cadastro, listagem, edição e exclusão de clientes
- **Vendas**: Registro e gerenciamento de vendas
- **Relatórios**: Geração de relatórios detalhados de vendas com exportação para CSV

## Tecnologias Utilizadas

- React.js
- TypeScript
- Bootstrap 4
- Font Awesome
- Node.js

## Pré-requisitos

- Node.js (versão 11.10.0 ou superior)
- npm (versão 6.7.0 ou superior)

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com a seguinte variável:
```
REACT_APP_API_URL=http://localhost:3000
```

## Executando o Projeto

Para iniciar o projeto em modo de desenvolvimento:

```bash
npm start
```

O projeto estará disponível em `http://localhost:8080`

Para criar uma versão de produção:

```bash
npm run build
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React
  ├── services/      # Serviços de API
  ├── types/         # Definições de tipos TypeScript
  ├── App.tsx        # Componente principal
  └── index.tsx      # Ponto de entrada da aplicação
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
