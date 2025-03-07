'use client'

import React, { useState } from 'react';
import { User, MapPin, Heart, History, Settings, LogOut, Edit, ChevronRight, Star, Clock, Package, Calendar, X } from 'lucide-react';

interface FavoriteRestaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime: string;
  distance: string;
  isFavorite: boolean;
}

interface Address {
  id: number;
  title: string;
  street: string;
  city: string;
  state: string;
  isMain: boolean;
}

interface OrderHistory {
  id: number;
  restaurantName: string;
  orderNumber: string;
  date: string;
  total: string;
  status: 'delivered' | 'cancelled' | 'processing';
  items: string[];
}

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      title: 'Endereço Principal',
      street: 'Rua das Flores, 123 - Jardim América',
      city: 'São Paulo',
      state: 'SP',
      isMain: true
    }
  ]);

  const [favoriteRestaurants, setFavoriteRestaurants] = useState<FavoriteRestaurant[]>([
    {
      id: 1,
      name: 'Restaurante do Chef',
      image: 'restaurant1.jpg',
      rating: 4.8,
      category: 'Contemporâneo • Brasileiro',
      deliveryTime: '30-45 min',
      distance: '2.5 km',
      isFavorite: true
    },
    {
      id: 2,
      name: 'Pizza Delícia',
      image: 'restaurant2.jpg',
      rating: 4.6,
      category: 'Pizza • Italiana',
      deliveryTime: '40-55 min',
      distance: '3.2 km',
      isFavorite: true
    }
  ]);

  const orderHistory: OrderHistory[] = [
    {
      id: 1,
      restaurantName: 'Restaurante do Chef',
      orderNumber: '#12345',
      date: '20/02/2025',
      total: 'R$ 89,90',
      status: 'delivered',
      items: ['1x Filé à Parmegiana', '1x Arroz', '1x Coca-Cola 350ml']
    },
    {
      id: 2,
      restaurantName: 'Pizza Delícia',
      orderNumber: '#12344',
      date: '15/02/2025',
      total: 'R$ 75,50',
      status: 'delivered',
      items: ['1x Pizza Grande Margherita', '1x Guaraná 2L']
    },
    {
      id: 3,
      restaurantName: 'Sushi Express',
      orderNumber: '#12343',
      date: '10/02/2025',
      total: 'R$ 132,00',
      status: 'cancelled',
      items: ['2x Combo 20 Peças', '1x Temaki Salmão']
    }
  ];

  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isMain'>>({
    title: '',
    street: '',
    city: '',
    state: ''
  });

  const toggleFavorite = (restaurantId: number) => {
    setFavoriteRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant =>
        restaurant.id === restaurantId
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );
    // Pedro, adicionar a chamada para a API aqui quando tiver o backend
    // const response = await api.post('/favorites', { restaurantId, isFavorite: !restaurant.isFavorite });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      setAddresses(prevAddresses =>
        prevAddresses.map(address =>
          address.id === editingAddress.id
            ? { ...editingAddress, ...newAddress }
            : address
        )
      );
    } else {
      const newId = addresses.length + 1;
      setAddresses(prevAddresses => [
        ...prevAddresses,
        {
          ...newAddress,
          id: newId,
          isMain: false
        }
      ]);
    }

    setNewAddress({
      title: '',
      street: '',
      city: '',
      state: ''
    });
    setEditingAddress(null);
    setIsAddressModalOpen(false);
  };

  const startEditingAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      title: address.title,
      street: address.street,
      city: address.city,
      state: address.state
    });
    setIsAddressModalOpen(true);
  };

  const setMainAddress = (addressId: number) => {
    setAddresses(prevAddresses =>
      prevAddresses.map(address => ({
        ...address,
        isMain: address.id === addressId
      }))
    );
  };

  const deleteAddress = (addressId: number) => {
    setAddresses(prevAddresses =>
      prevAddresses.filter(address => address.id !== addressId)
    );
  };

  const getStatusColor = (status: OrderHistory['status']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: OrderHistory['status']) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      case 'processing':
        return 'Em processamento';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Minha Conta</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 bg-red-600 rounded-full text-white">
                    <Edit size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-semibold">João Silva</h2>
                <p className="text-gray-600">joao.silva@email.com</p>
              </div>

              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    activeTab === 'favorites' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart size={20} />
                    <span>Favoritos</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    activeTab === 'address' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <span>Endereços</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    activeTab === 'history' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <History size={20} />
                    <span>Histórico de Pedidos</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Settings size={20} />
                    <span>Configurações</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-red-600">
                  <div className="flex items-center gap-3">
                    <LogOut size={20} />
                    <span>Sair</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Restaurantes Favoritos</h2>
                <div className="grid gap-4">
                  {favoriteRestaurants.filter(r => r.isFavorite).map((restaurant) => (
                    <div key={restaurant.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{restaurant.name}</h3>
                              <p className="text-sm text-gray-600">{restaurant.category}</p>
                            </div>
                            <button 
                              onClick={() => toggleFavorite(restaurant.id)}
                              className="text-red-600"
                            >
                              <Heart size={20} fill={restaurant.isFavorite ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-400" fill="currentColor" />
                              {restaurant.rating}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {restaurant.deliveryTime}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin size={16} />
                              {restaurant.distance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Meus Endereços</h2>
                  <button 
                    onClick={() => {
                      setEditingAddress(null);
                      setNewAddress({
                        title: '',
                        street: '',
                        city: '',
                        state: ''
                      });
                      setIsAddressModalOpen(true);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <MapPin size={20} />
                    Adicionar Endereço
                  </button>
                </div>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{address.title}</h3>
                            {address.isMain && (
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.state}</p>
                        </div>
                        <div className="flex gap-2">
                          {!address.isMain && (
                            <button 
                              onClick={() => setMainAddress(address.id)}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              Tornar Principal
                            </button>
                          )}
                          <button 
                            onClick={() => startEditingAddress(address)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Edit size={20} />
                          </button>
                          {!address.isMain && (
                            <button 
                              onClick={() => deleteAddress(address.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Histórico de Pedidos</h2>
                <div className="grid gap-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{order.restaurantName}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Package size={16} />
                            <span>{order.orderNumber}</span>
                            <span>•</span>
                            <Calendar size={16} />
                            <span>{order.date}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="text-sm text-gray-600 space-y-1">
                          {order.items.map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t">
                          <span className="font-medium">Total</span>
                          <span className="font-semibold">{order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Endereço */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
              </h3>
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Endereço
                </label>
                <input
                  type="text"
                  value={newAddress.title}
                  onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Ex: Casa, Trabalho"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Rua, número, complemento"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Cidade"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Estado"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                {editingAddress ? 'Salvar Alterações' : 'Adicionar Endereço'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;