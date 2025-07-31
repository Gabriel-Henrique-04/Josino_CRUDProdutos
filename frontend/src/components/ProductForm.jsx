import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';

export default function ProductForm({ productToEdit, onSave, onCancel }) {
  const [product, setProduct] = useState({
    nome: '',
    descricao: '',
    preco: '',
    url_imagem: '',
    categoria: '',
  });

  const [loading, setLoading] = useState(false); // controle de loading para evitar duplicação

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct({
        nome: '',
        descricao: '',
        preco: '',
        url_imagem: '',
        categoria: '',
      });
    }
  }, [productToEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return; // evita múltiplos submits enquanto aguarda

    console.log('Enviando produto:', product);
    setLoading(true);

    try {
      const productToSend = {
        ...product,
        preco: parseFloat(product.preco), // converte preco para número
      };

      if (product.id || product.idproduto) {
        await updateProduct(product.id || product.idproduto, productToSend);
      } else {
        await createProduct(productToSend);
      }
      onSave(productToSend);  // avisa que salvou para atualizar a lista e esconder o form
    } catch (error) {
      alert('Erro ao salvar produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nome"
        value={product.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
        disabled={loading}
      />
      <input
        name="descricao"
        value={product.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        required
        disabled={loading}
      />
      <input
        type="number"
        step="0.01"
        name="preco"
        value={product.preco}
        onChange={handleChange}
        placeholder="Preço"
        required
        disabled={loading}
      />
      <input
        name="url_imagem"
        value={product.url_imagem}
        onChange={handleChange}
        placeholder="URL da Imagem"
        disabled={loading}
      />
      <input
        name="categoria"
        value={product.categoria}
        onChange={handleChange}
        placeholder="Categoria"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
      <button type="button" onClick={onCancel} disabled={loading}>Cancelar</button>
    </form>
  );
}
