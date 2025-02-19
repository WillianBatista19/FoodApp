'use client'

import React, { useState } from 'react';
import { Menu, Store, Clock, Pizza, Settings, PlusCircle, Edit, Trash2 } from 'lucide-react';

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');

  // Estados para os inputs do tab "info"
  const [restaurantName, setRestaurantName] = useState("Restaurante do Chef");
  const [category, setCategory] = useState("Contemporâneo • Brasileiro");
  const [openingHours, setOpeningHours] = useState("11:00 - 23:00");
  const [deliveryTime, setDeliveryTime] = useState("30-45 minutos");
  const [description, setDescription] = useState("Restaurante especializado em pratos contemporâneos com um toque da culinária brasileira.");

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Cardápio</h2>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
                <PlusCircle size={20} />
                Adicionar Prato
              </button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {['Pratos Principais', 'Bebidas', 'Sobremesas'].map((category) => (
                <div key={category} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">4 itens</p>
                </div>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-300 relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Prato Especial {item}</h3>
                      <span className="text-green-600 font-semibold">R$ 45,90</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Descrição deliciosa do prato com ingredientes especiais e temperos únicos.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        30 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Pizza size={16} />
                        Serve 2
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantDashboard;
