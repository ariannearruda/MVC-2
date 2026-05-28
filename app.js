// Arquivo principal da aplicação
const express = require('express');
const path = require('path');
const app = express();
const produtoRoutes = require('./routes/produtoRoutes');

// Configura o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para ler dados de formulários (importante para POST)
app.use(express.urlencoded({ extended: true }));

// Configura a pasta 'public' como estática (CSS, imagens, JS)
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

app.use(session({
  secret: 'segredo-super-seguro', // chave usada para assinar o cookie
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 minutos
}));

// Usa as rotas definidas em produtoRoutes
app.use('/', produtoRoutes);

// A Porta do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
