const express = require('express');
const cors = require('cors');
const path = require('path');
const usuariosRoutes = require('./src/routes/usuariosRoutes');

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "src/public"))); // arquivos estáticos

// === Rota principal ===
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public", "index.html"));
});

// === Rotas da API de usuários ===
app.use('/usuarios', usuariosRoutes);

// === Iniciar servidor ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
module.exports = app;
