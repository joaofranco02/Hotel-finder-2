'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api';

export default function ApiTestPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function testApi() {
      try {
        // Test health endpoint
        const health = await apiClient.healthCheck();
        
        // Test hotels endpoint
        const hotels = await apiClient.getHotels({ limit: 5 });
        
        setData({ health, hotels });
        setStatus('success');
      } catch (err: any) {
        setError(err.message);
        setStatus('error');
      }
    }

    testApi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Teste de Conexão da API</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status da Conexão</h2>
          
          {status === 'loading' && (
            <div className="flex items-center gap-3 text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
              <span>Testando conexão...</span>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">✅ API Conectada com Sucesso!</span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="font-semibold mb-2">Health Check:</h3>
                <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
                  {JSON.stringify(data?.health, null, 2)}
                </pre>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="font-semibold mb-2">Hotéis Encontrados: {data?.hotels?.total || 0}</h3>
                <pre className="text-sm bg-white p-2 rounded overflow-x-auto max-h-96">
                  {JSON.stringify(data?.hotels, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">❌ Falha na Conexão</span>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-4">
                <h3 className="font-semibold mb-2">Erro:</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h3 className="font-semibold mb-2">💡 Soluções:</h3>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>Certifique-se de que o backend está rodando em <code className="bg-yellow-100 px-1 rounded">http://localhost:8000</code></li>
                  <li>Teste o health check: <a href="http://localhost:8000/health" target="_blank" className="text-blue-600 underline">http://localhost:8000/health</a></li>
                  <li>Verifique se há erros no terminal do backend</li>
                  <li>Reinicie o backend se necessário</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Informações da Configuração</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="font-medium">API Base URL:</span>
              <code className="bg-gray-200 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
              </code>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="font-medium">API Version:</span>
              <code className="bg-gray-200 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_API_V1 || '/api/v1'}
              </code>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="font-medium">Health Endpoint:</span>
              <code className="bg-gray-200 px-2 py-1 rounded">
                http://localhost:8000/health
              </code>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="font-medium">Hotels Endpoint:</span>
              <code className="bg-gray-200 px-2 py-1 rounded">
                http://localhost:8000/api/v1/hotels
              </code>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a 
              href="http://localhost:8000/docs" 
              target="_blank"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition"
            >
              📚 Abrir Documentação da API
            </a>
            <a 
              href="/" 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition"
            >
              🏠 Ir para Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
