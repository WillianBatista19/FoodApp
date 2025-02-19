import React from 'react';
import { Search, MapPin, User, Clock, Star, Flame } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">FoodApp</div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 hover:text-gray-200">
                <MapPin />
                <span>Selecionar endereço</span>
              </button>
              <button className="flex items-center gap-2 hover:text-gray-200">
                <User />
                <span>Entrar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-red-600 text-white pb-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Tá com fome? Seus restaurantes favoritos estão aqui</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar restaurantes ou pratos..."
                className="w-full px-4 py-3 pl-12 rounded-lg text-gray-800"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-10 text-black">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center gap-2">
            <Flame className="w-6 h-6 text-red-600" />
            <span className="font-medium">Mais Populares</span>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-red-600" />
            <span className="font-medium">Entrega Rápida</span>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center gap-2">
            <Star className="w-6 h-6 text-red-600" />
            <span className="font-medium">Melhor Avaliados</span>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            <span className="font-medium">Perto de Você</span>
          </button>
        </div>

        {/* Restaurant List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gray-300" /> {/* Placeholder for restaurant image */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Restaurante {item}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.8</span>
                  <span>•</span>
                  <span>30-45 min</span>
                </div>
                <p className="text-gray-600 text-sm">Hambúrguer • Pizza • Brasileira</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;