const API_BASE = 'http://localhost:3000/api/produtos';

export async function getProducts() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Erro ao buscar produtos');
    return await res.json();
  } catch (error) {
    console.error('Erro na API getProducts:', error);
    throw error;
  }
}

export async function createProduct(product) {
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Erro ao criar produto');
    return await res.json();
  } catch (error) {
    console.error('Erro na API createProduct:', error);
    throw error;
  }
}

export async function updateProduct(id, product) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      console.error('Erro no backend:', responseBody);
      throw new Error(responseBody.error || 'Erro ao atualizar produto');
    }

    return responseBody;
  } catch (error) {
    console.error('Erro na API updateProduct:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erro ao deletar produto');
    return await res.json();
  } catch (error) {
    console.error('Erro na API deleteProduct:', error);
    throw error;
  }
}
