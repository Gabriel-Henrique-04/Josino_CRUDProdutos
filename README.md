# Cadastro de Produtos

Projeto simples para cadastro, edição, exclusão e listagem de produtos, com imagens via URL.

---

## Tecnologias usadas

- Frontend: ReactJS  
- Backend: Node.js com Express  
- Banco de dados: MySQL (pode ser outro, mas está configurado para MySQL)  
- Comunicação via API REST  

---

## Requisitos

- Node.js instalado (versão 14+ recomendada)  
- MySQL instalado e rodando  
- Cliente HTTP para testes (ex: Postman) opcional  

---

### Estrutura do projeto

/backend
  /controllers
  /models
  /routes
  /services
  config.js
  app.js

/frontend
  /components
  /pages
  /services
  App.jsx
  main.jsx

 --- 

## Como rodar o projeto

### 1. Clonar o repositório

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

### 2. Configurar o banco de dados
Crie um banco no MySQL, ex:

CREATE DATABASE cadastro_produtos;

Ajuste as configurações de conexão no backend (config/db.js ou arquivo equivalente) com seu usuário, senha e nome do banco.

Crie a tabela produto com a estrutura:

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  url_imagem VARCHAR(1000),
  categoria VARCHAR(255)
);

### 3. Rodar o backend

cd backend
npm install
npm start
O backend estará rodando em http://localhost:3000.

### 4. Rodar o frontend
Em outro terminal:

cd frontend
npm install
npm start
O frontend abrirá em http://localhost:5173 (ou http://localhost:3000 dependendo da sua configuração).

### Funcionalidades
Listar produtos cadastrados

Criar novo produto

Editar produto existente

Excluir produto

Exibir imagem via URL

### Observações
No formulário de produto, a URL da imagem deve ser válida para que a imagem apareça corretamente.
O botão de salvar fica desabilitado durante o envio para evitar duplicações.
Caso queira alterar a porta do backend ou frontend, ajuste os scripts e configurações correspondentes.
