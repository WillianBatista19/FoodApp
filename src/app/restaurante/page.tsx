'use client'

import React, { useEffect, useState } from 'react';
import { Star, Clock, DollarSign, Search, Heart, MapPin, Info } from 'lucide-react';
import Image from 'next/image';
import { Product, fetchProducts } from '../../../services/apiTest';

const RestaurantView = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(); // Pega os pratos cadastrados na API
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Busca os produtos assim que o componente é montado
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Hero */}
      <div className="relative h-[300px] md:h-[400px] bg-gray-300">
        <div className="absolute inset-0 bg-opacity-30">
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

          {/* Menu Content - Exibindo os pratos */}
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

            {/* Aqui os pratos serão exibidos */}
            {loading ? (
              <p>Carregando pratos...</p>
            ) : products.length === 0 ? (
              <p>Nenhum prato encontrado.</p>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-32 h-32 md:h-24 bg-gray-300 rounded-lg flex-shrink-0 relative">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          </div>
                          <span className="font-semibold text-lg md:text-base">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {product.prepTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>{product.servings}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;
