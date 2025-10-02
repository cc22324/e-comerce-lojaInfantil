require("dotenv").config();
const express = require("express");
const mssql = require("mssql");

const app = express();
app.use(express.json());

const porta = process.env.PORTA || 3000;
const stringSQL = process.env.CONNECTION_STRING;

// conexão
async function conectaBD() {
  try {
    await mssql.connect(stringSQL);
    console.log("✅ Conectado ao banco de dados!");
  } catch (error) {
    console.error("❌ Erro na conexão com o BD:", error);
  }
}
conectaBD();

// ======================== ROTAS USUÁRIOS ========================

// GET todos
app.get("/Usuarios", async (req, res) => {
  try {
    const usuarios = await mssql.query("SELECT * FROM Usuarios");
    res.json(usuarios.recordset);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

// GET por id
app.get("/Usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await mssql.query(`SELECT * FROM Usuarios WHERE id=${id}`);
    if (usuario.recordset.length > 0) {
      res.json(usuario.recordset[0]);
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

// POST criar
app.post("/Usuarios", async (req, res) => {
  const { nome, email, senha, perfil, endereco, telefone } = req.body;
  try {
    await mssql.query(
      `INSERT INTO Usuarios (nome,email,senha,perfil,endereco,telefone)
       VALUES ('${nome}','${email}','${senha}','${perfil}','${endereco}','${telefone}')`
    );
    res.status(201).json({ mensagem: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar usuário" });
  }
});

// PATCH atualizar
app.patch("/Usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil, endereco, telefone } = req.body;
  try {
    const resultado = await mssql.query(
      `UPDATE Usuarios SET
        nome='${nome}', email='${email}', senha='${senha}',
        perfil='${perfil}', endereco='${endereco}', telefone='${telefone}'
       WHERE id=${id}`
    );
    if (resultado.rowsAffected[0] === 1) {
      res.json({ mensagem: "Usuário atualizado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar usuário" });
  }
});

// DELETE
app.delete("/Usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await mssql.query(`DELETE FROM Usuarios WHERE id=${id}`);
    if (resultado.rowsAffected[0] === 1) {
      res.json({ mensagem: "Usuário deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ erro: "Erro ao excluir usuário" });
  }
});

// ======================== ROTAS PRODUTOS ========================

// GET todos
app.get("/Produtos", async (req, res) => {
  try {
    const produtos = await mssql.query("SELECT * FROM Produtos");
    res.json(produtos.recordset);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// GET por id
app.get("/Produtos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await mssql.query(`SELECT * FROM Produtos WHERE id=${id}`);
    if (produto.recordset.length > 0) {
      res.json(produto.recordset[0]);
    } else {
      res.status(404).json({ mensagem: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

// POST criar
app.post("/Produtos", async (req, res) => {
  const { nome, descricao, preco, quantidade, categoria, imagem } = req.body;
  try {
    await mssql.query(
      `INSERT INTO Produtos (nome,descricao,preco,quantidade,categoria,imagem)
       VALUES ('${nome}','${descricao}',${preco},${quantidade},'${categoria}','${imagem}')`
    );
    res.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar produto" });
  }
});

// PATCH atualizar
app.patch("/Produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade, categoria, imagem } = req.body;
  try {
    const resultado = await mssql.query(
      `UPDATE Produtos SET
        nome='${nome}', descricao='${descricao}', preco=${preco},
        quantidade=${quantidade}, categoria='${categoria}', imagem='${imagem}'
       WHERE id=${id}`
    );
    if (resultado.rowsAffected[0] === 1) {
      res.json({ mensagem: "Produto atualizado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar produto" });
  }
});

// DELETE
app.delete("/Produtos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await mssql.query(`DELETE FROM Produtos WHERE id=${id}`);
    if (resultado.rowsAffected[0] === 1) {
      res.json({ mensagem: "Produto deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ erro: "Erro ao excluir produto" });
  }
});

// ======================== ROTA PRINCIPAL ========================
app.use("/", (req, res) => {
  res.json({ mensagem: "Servidor em execução 🚀" });
});

// iniciar servidor
app.listen(porta, () => console.log(`✅ API funcionando na porta ${porta}`));
