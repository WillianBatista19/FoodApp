'use client';

import { useState } from 'react';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Criar Conta' : 'Entrar'}
        </h2>
        <form className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Seu nome"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
          >
            {isRegister ? 'Registrar' : 'Entrar'}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          {isRegister ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-red-600 font-semibold ml-1 hover:underline"
          >
            {isRegister ? 'Entrar' : 'Criar conta'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
