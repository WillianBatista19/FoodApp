'use client'

import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Menu, Store, Clock, Pizza, Settings, PlusCircle, Edit, Trash2, X } from 'lucide-react';
import { Product, EditFormData, fetchProducts, saveProduct, deleteProduct, uploadImage } from '../../../services/api';

const RestaurantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'info' | 'settings'>('menu');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [restaurantName, setRestaurantName] = useState<string>("Restaurante do Chef");
  const [category, setCategory] = useState<string>("Contemporâneo • Brasileiro");
  const [openingHours, setOpeningHours] = useState<string>("11:00 - 23:00");
  const [deliveryTime, setDeliveryTime] = useState<string>("30-45 minutos");
  const [description, setDescription] = useState<string>("Restaurante especializado em pratos contemporâneos com um toque da culinária brasileira.");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [editForm, setEditForm] = useState<EditFormData>({
    name: '',
    price: '',
    description: '',
    prepTime: '',
    servings: '',
    category: '',
    image: null
  });

  const handleSaveChanges = async () => {
    const data = {
      restaurantName,
      category,
      openingHours,
      deliveryTime,
      description,
    };
  
    const response = await fetch('/api/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      alert('Alterações salvas com sucesso!');
    } else {
      alert('Houve um erro ao salvar as alterações.');
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar produtos. Tente novamente mais tarde.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleEditClick = (product: Product): void => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      prepTime: product.prepTime,
      servings: product.servings,
      category: product.category,
      image: product.image
    });
    setIsEditModalOpen(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      let imageUrl = editForm.image;
      
      if (selectedFile) {
        const uploadResult = await uploadImage(selectedFile);
        imageUrl = uploadResult.imageUrl;
      }
      
      const numericPrice = typeof editForm.price === 'string' 
        ? parseFloat(editForm.price) || 0 
        : editForm.price;
      
      const productData = {
        ...(selectedProduct?.id ? { id: selectedProduct.id } : {}),
        name: editForm.name,
        price: numericPrice,
        description: editForm.description,
        prepTime: editForm.prepTime,
        servings: editForm.servings,
        category: editForm.category,
        image: imageUrl
      };
      
      const savedProduct = await saveProduct(productData);
      
      // Update local state with the saved product
      if (selectedProduct) {
        setProducts(products.map(p => 
          p.id === selectedProduct.id ? savedProduct : p
        ));
      } else {
        setProducts([...products, savedProduct]);
      }
      
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      setError('Erro ao salvar produto. Tente novamente.');
      console.error('Error saving product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId: number): Promise<void> => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        setIsLoading(true);
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
        setError(null);
      } catch (err) {
        setError('Erro ao excluir produto. Tente novamente.');
        console.error('Error deleting product:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getCategoryCount = (categoryName: string): number => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="font-bold text-xl">Restaurante do Chef</h1>
          <p className="text-sm text-gray-600">Perfil Verificado</p>
        </div>
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 ${
              activeTab === 'menu' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'
            }`}
          >
            <Menu /> Cardápio
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 ${
              activeTab === 'info' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'
            }`}
          >
            <Store /> Informações
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'settings' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'
            }`}
          >
            <Settings /> Configurações
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Cardápio</h2>
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setEditForm({
                    name: '',
                    price: '',
                    description: '',
                    prepTime: '',
                    servings: '',
                    category: '',
                    image: null
                  });
                  setSelectedFile(null);
                  setIsEditModalOpen(true);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                disabled={isLoading}
              >
                <PlusCircle size={20} />
                Adicionar Prato
              </button>
            </div>

            {/* Categorias */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {['Pratos Principais', 'Bebidas', 'Sobremesas'].map((categoryName) => (
                <div key={categoryName} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">{categoryName}</h3>
                  <p className="text-sm text-gray-600">{getCategoryCount(categoryName)} itens</p>
                </div>
              ))}
            </div>

            {/* Menu Itens */}
            {!isLoading && products.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-600">Nenhum produto encontrado. Adicione seu primeiro prato ao cardápio!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="h-48 bg-gray-300 relative">
                      {product.image ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={product.image} 
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            priority={false}
                          />
                        </div>
                      ) : null}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button 
                          onClick={() => handleEditClick(product)}
                          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                          disabled={isLoading}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                          disabled={isLoading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="text-green-600 font-semibold">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {product.prepTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Pizza size={16} />
                          {product.servings}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
          </div>
        )}

        {activeTab === 'info' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Informações do Restaurante</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Restaurante
                  </label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário de Funcionamento
                  </label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo Médio de Entrega
                  </label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea 
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={handleSaveChanges}
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Configurações</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
              <p className="text-gray-600">Configurações do restaurante serão implementadas em breve.</p>
            </div>
          </div>
        )}

        {/* Modal - Aparece quando isEditModalOpen é true */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {selectedProduct ? 'Editar Prato' : 'Adicionar Novo Prato'}
                </h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  disabled={isLoading}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagem do Prato
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                    disabled={isLoading}
                  />
                  {editForm.image && (
                    <div className="relative h-40 mt-2 rounded overflow-hidden">
                      <Image
                        src={editForm.image}
                        alt="Preview"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Prato
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo de Preparo
                  </label>
                  <input
                    type="text"
                    value={editForm.prepTime}
                    onChange={(e) => setEditForm({...editForm, prepTime: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Ex: 30 min"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serve
                  </label>
                  <input
                    type="text"
                    value={editForm.servings}
                    onChange={(e) => setEditForm({...editForm, servings: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Ex: Serve 2"
                    disabled={isLoading}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Pratos Principais">Pratos Principais</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Sobremesas">Sobremesas</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantDashboard;