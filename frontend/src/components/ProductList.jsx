import React from 'react';
import { deleteProduct } from '../services/api';

export default function ProductList({ products, onEdit, onDelete }) {
  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      await deleteProduct(id);
      onDelete(); // Chama função do ProductsPage para atualizar a lista
    }
  }

  return (
    <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id || p.idproduto}>
            <td>{p.nome}</td>
            <td>{p.descricao}</td>
            <td>R$ {Number(p.preco).toFixed(2)}</td>
            <td>{p.categoria}</td>
            <td><img src={p.url_imagem} alt={p.nome} width="50" /></td>
            <td>
              <button onClick={() => onEdit(p)}>Editar</button>{' '}
              <button onClick={() => handleDelete(p.id || p.idproduto)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
