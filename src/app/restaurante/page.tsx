'use client'

import React, { useState } from 'react';
import { Star, Clock, DollarSign, Search, Heart, MapPin, Info } from 'lucide-react';

const RestaurantView = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof menuItems>('Todos');

  const menuItems = {
    Todos: [1, 2, 3, 4, 5],
    Principais: [1, 2, 3],
    Bebidas: [4],
    Sobremesas: [5]
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Restaurant Hero */}
      <div className="relative h-[300px] md:h-[400px] bg-gray-300">
        <div className="absolute inset-0 bg-black bg-opacity-30">
          {/* Container centralizado */}
          <div className="max-w-6xl mx-auto h-full px-4">
            <div className="absolute bottom-0 left-0 right-0">
              <div className="max-w-6xl mx-auto">
                <div className="bg-white p-4 md:p-6 rounded-t-lg w-full md:w-auto">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h1 className="text-xl md:text-3xl font-bold mb-2">Restaurante do Chef</h1>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          4.8 (500+ avaliações)
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          30-45 min
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Entrega R$ 5,90
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full self-end md:self-start">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - Informações */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="sticky top-4 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Info className="w-5 h-5" />
                  <span className="font-medium">Sobre</span>
                </div>
                <p className="text-sm">Contemporâneo • Brasileiro</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Horário</span>
                </div>
                <p className="text-sm">11:00 - 23:00</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Endereço</span>
                </div>
                <p className="text-sm">2.5 km de distância</p>
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar no cardápio..."
                className="w-full px-4 py-3 pl-12 rounded-lg border"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {(['Todos', 'Principais', 'Bebidas', 'Sobremesas'] as const).map((category) => (
            <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
                {category}
            </button>
            ))}

            </div>

            {/* Menu Items */}
            <div className="grid gap-4">
              {menuItems[selectedCategory].map((item) => (
                <div key={item} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 h-32 md:h-24 bg-gray-300 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold">Prato Especial {item}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Descrição deliciosa do prato com ingredientes especiais e temperos únicos.
                          </p>
                        </div>
                        <span className="font-semibold text-lg md:text-base">R$ 45,90</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          30 min
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span>Serve 2 pessoas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;
