import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { createProduct, updateProduct, getProducts } from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingProduct(null);
    setShowForm(false);
  }

  async function handleSave(product) {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id || editingProduct.idproduto, product);
      } else {
        await createProduct(product);
      }
      await loadProducts(); // Recarrega os produtos
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  }

  return (
    <div>
      <h1>Cadastro de Produtos</h1>
      <button onClick={() => setShowForm(true)}>Novo Produto</button>

      {showForm && (
        <ProductForm
          productToEdit={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <ProductList
  products={products}
  onEdit={handleEdit}
  onDelete={loadProducts}  // passa a função para atualizar a lista ao deletar
/>
    </div>
  );
}
