const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    db.query('SELECT * FROM produto', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM produto WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  create: (data, callback) => {
    const { nome, descricao, preco, url_imagem, categoria } = data;
    const sql = 'INSERT INTO produto (nome, descricao, preco, url_imagem, categoria) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, descricao, preco, url_imagem, categoria], callback);
  },

  update: (id, data, callback) => {
    const { nome, descricao, preco, url_imagem, categoria } = data;
    const sql = 'UPDATE produto SET nome = ?, descricao = ?, preco = ?, url_imagem = ?, categoria = ? WHERE id = ?';
    db.query(sql, [nome, descricao, preco, url_imagem, categoria, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM produto WHERE id = ?', [id], callback);
  }
};

module.exports = Product;
