const Product = require('../models/productModel');

// Listar todos os produtos
exports.getAll = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
    res.json(results);
  });
};

// Buscar produto por ID
exports.getById = (req, res) => {
  const id = req.params.id;
  Product.getById(id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar produto.' });
    }
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.json(product);
  });
};

// Criar novo produto
exports.create = (req, res) => {
  console.log('Body recebido no create:', req.body);
  const data = req.body;

  // Validação simples para campo obrigatório
  if (!data.nome || !data.descricao || !data.preco) {
    return res.status(400).json({ error: "Campos 'nome', 'descricao' e 'preco' são obrigatórios." });
  }
  
  Product.create(data, (err, result) => {
    if (err) {
      console.error('Erro ao criar produto:', err); // LOG do erro completo
      return res.status(500).json({ error: 'Erro ao criar produto.' });
    }
    res.status(201).json({ 
  message: 'Produto criado com sucesso!', 
  produtoCriado: data 
});
  });
};

// Atualizar produto existente
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  console.log('ID recebido no update:', id);
  const data = req.body;

  Product.update(id, data, (err, result) => {
    if (err) {
  console.error('Erro detalhado:', err); // adiciona esse log
  return res.status(500).json({ error: 'Erro ao atualizar produto.', details: err });
}

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.status(200).json({ message: 'Produto atualizado com sucesso!', produtoAtualizado: data });
  });
};

// Deletar produto
exports.delete = (req, res) => {
  const id = parseInt(req.params.id);

  Product.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar produto.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.json({ message: 'Produto deletado com sucesso!' });
  });
};
