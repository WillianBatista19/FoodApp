// services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const USE_MOCK = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL;

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

const STORAGE_KEY = 'restaurant_products';

const getMockProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    const initialProducts: Product[] = [
      {
        id: 1,
        name: 'Prato Especial 1',
        price: 45.90,
        description: 'Descrição deliciosa do prato com ingredientes especiais e temperos únicos.',
        prepTime: '30 min',
        servings: 'Serve 2',
        image: null,
        category: 'Pratos Principais'
      },
      {
        id: 2,
        name: 'Suco Natural',
        price: 12.90,
        description: 'Suco natural de frutas da estação.',
        prepTime: '10 min',
        servings: 'Serve 1',
        image: null,
        category: 'Bebidas'
      }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  } catch (error) {
    console.error('Erro ao acessar localStorage:', error);
    return [];
  }
};

const saveMockProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) {
    console.log('Usando mock para fetchProducts');
    // Simular um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockProducts();
  }
  
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Falha ao buscar produtos');
  return response.json();
};

export const saveProduct = async (product: EditFormData & { id?: number }): Promise<Product> => {
  if (USE_MOCK) {
    console.log('Usando mock para saveProduct');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const products = getMockProducts();

    const numericPrice = typeof product.price === 'string' 
      ? parseFloat(product.price) || 0 
      : product.price;
    
    if (product.id) {
      const updatedProducts = products.map(p => 
        p.id === product.id 
          ? { 
              ...p, 
              name: product.name,
              price: numericPrice,
              description: product.description,
              prepTime: product.prepTime,
              servings: product.servings,
              category: product.category,
              image: product.image
            } 
          : p
      );
      
      saveMockProducts(updatedProducts);
      return updatedProducts.find(p => p.id === product.id) as Product;
    } else {
      const newProduct: Product = {
        id: Math.max(0, ...products.map(p => p.id)) + 1,
        name: product.name,
        price: numericPrice,
        description: product.description,
        prepTime: product.prepTime,
        servings: product.servings,
        category: product.category,
        image: product.image
      };
      
      const updatedProducts = [...products, newProduct];
      saveMockProducts(updatedProducts);
      return newProduct;
    }
  }
  
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
  if (USE_MOCK) {
    console.log('Usando mock para deleteProduct');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const products = getMockProducts();
    const updatedProducts = products.filter(p => p.id !== id);
    saveMockProducts(updatedProducts);
    return true;
  }
  
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) throw new Error('Falha ao excluir produto');
  return true;
};

export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
  if (USE_MOCK) {
    console.log('Usando mock para uploadImage');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    });
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) throw new Error('Falha ao fazer upload da imagem');
  return response.json();
};