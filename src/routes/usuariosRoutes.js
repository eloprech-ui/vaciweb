const express = require("express");
const router = express.Router();
const db = require("../config/db"); // sua conexão com MySQL

// === Cadastro de usuário ===
router.post("/cadastrar", (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao cadastrar usuário." });

        const id_cliente = result.insertId;
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            usuario: { id_cliente, nome, email }
        });
    });
});

// === Login ===
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) return res.status(400).json({ error: "Preencha todos os campos!" });

    const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
    db.query(sql, [email, senha], (err, results) => {
        if (err) return res.status(500).json({ error: "Erro interno no servidor." });
        if (results.length === 0) return res.status(401).json({ error: "Email ou senha incorretos!" });

        res.status(200).json({
            success: true,
            message: "Login realizado com sucesso!",
            usuario: results[0]
        });
    });
});

// === Salvar pontuação ===
router.post("/salvar-pontuacao", (req, res) => {
    const { id_cliente, score } = req.body;

    if (!id_cliente || score == null) {
        return res.status(400).json({ error: "id_cliente e score são obrigatórios." });
    }

    const sql = "INSERT INTO score (id_cliente, score) VALUES (?, ?)";
    db.query(sql, [id_cliente, score], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao salvar pontuação." });

        res.status(201).json({
            success: true,
            message: "Pontuação salva com sucesso!",
            id: result.insertId
        });
    });
});

module.exports = router;
