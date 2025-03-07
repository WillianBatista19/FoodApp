const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  prepTime: string;
  servings: string;
  image: string | null;
  category: string;
}

export interface EditFormData {
  name: string;
  price: number | string;
  description: string;
  prepTime: string;
  servings: string;
  category: string;
  image: string | null;
}

// Funções para produtos
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Falha ao buscar produtos');
  return response.json();
};

export const saveProduct = async (product: EditFormData & { id?: number }): Promise<Product> => {
  const method = product.id ? 'PUT' : 'POST';
  const url = product.id ? `${API_URL}/products/${product.id}` : `${API_URL}/products`;

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw new Error('Falha ao salvar produto');
  return response.json();
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Falha ao excluir produto');
  return true;
};

// Função para upload de imagens
export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Falha ao fazer upload da imagem');
  return response.json(); // Retorna a URL da imagem
};

// Função para restaurante
export const saveRestaurantInfo = async (restaurantInfo: {
  restaurantName: string;
  category: string;
  openingHours: string;
  deliveryTime: string;
  description: string;
}) => {
  const response = await fetch(`${API_URL}/restaurant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restaurantInfo),
  });

  if (!response.ok) throw new Error('Falha ao salvar informações do restaurante');
  return response.json();
};
