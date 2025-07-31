const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const db = require('./config/db');


// Carregar variáveis do .env
dotenv.config();

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());

// Testar conexão com o banco
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
  }
});

// Rotas
app.use('/api/produtos', productRoutes);

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
