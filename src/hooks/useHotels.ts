/**
 * Custom hook for fetching hotels
 */

'use client';

import { useState, useEffect } from 'react';
import type { Hotel, SearchParams } from '@/types/hotel';

// Mock data as fallback
const MOCK_HOTELS: Hotel[] = [
  // Hotéis de Belém - PA
  {
    id: 1,
    nome: "Grand Mercure Belém",
    endereco: "Av. Nazaré, 375 - Nazaré",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 280.00,
    classificacao: 4.5,
    descricao: "Hotel moderno no bairro da Nazaré, próximo ao comércio"
  },
  {
    id: 2,
    nome: "Radisson Hotel Belém",
    endereco: "Av. Bernardo Sayão, 4804 - Guamá",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 320.00,
    classificacao: 4.7,
    descricao: "Hotel de luxo com vista para a Baía do Guajará"
  },
  {
    id: 3,
    nome: "Hotel Princesa Louçã",
    endereco: "Av. Presidente Vargas, 882 - Campina",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 180.00,
    classificacao: 4.2,
    descricao: "Hotel tradicional no centro histórico de Belém"
  },
  {
    id: 4,
    nome: "Ibis Belém Aeroporto",
    endereco: "Rod. Mário Covas, s/n - Val-de-Cans",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 165.00,
    classificacao: 4.0,
    descricao: "Próximo ao aeroporto, ideal para viajantes"
  },
  {
    id: 5,
    nome: "Soft Inn Batista Campos",
    endereco: "Rua Ó de Almeida, 476 - Batista Campos",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 195.00,
    classificacao: 4.3,
    descricao: "Hotel aconchegante no bairro Batista Campos"
  },
  {
    id: 6,
    nome: "Atrium Quinta de Pedras",
    endereco: "Tv. Quintino Bocaiúva, 1645 - Nazaré",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 210.00,
    classificacao: 4.4,
    descricao: "Charme e conforto no coração da Nazaré"
  },
  {
    id: 7,
    nome: "Hotel Sagres Belém",
    endereco: "Av. Gov. José Malcher, 2927 - Nazaré",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 155.00,
    classificacao: 3.9,
    descricao: "Boa relação custo-benefício na Nazaré"
  },
  {
    id: 8,
    nome: "Belém Soft Hotel",
    endereco: "Tv. Quintino Bocaiúva, 1660 - Nazaré",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 175.00,
    classificacao: 4.1,
    descricao: "Hotel confortável próximo a restaurantes e bares"
  },
  {
    id: 9,
    nome: "Grão Pará Hotel",
    endereco: "Av. Presidente Vargas, 718 - Campina",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 140.00,
    classificacao: 3.8,
    descricao: "Hotel econômico no centro de Belém"
  },
  {
    id: 10,
    nome: "Hotel Princípe",
    endereco: "Av. Gov. José Malcher, 485 - Nazaré",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 125.00,
    classificacao: 3.7,
    descricao: "Opção econômica na Nazaré"
  },
  {
    id: 11,
    nome: "Hangar Centro de Convenções",
    endereco: "Av. Dr. Freitas, 1000 - Marco",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 245.00,
    classificacao: 4.5,
    descricao: "Hotel com centro de convenções no bairro do Marco"
  },
  {
    id: 12,
    nome: "Hotel Fortaleza",
    endereco: "Rua Ferreira Cantão, 208 - Umarizal",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 135.00,
    classificacao: 3.6,
    descricao: "Hotel simples e funcional no Umarizal"
  },
  {
    id: 13,
    nome: "Beira Rio Hotel",
    endereco: "Av. Bernardo Sayão, 5256 - Guamá",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 190.00,
    classificacao: 4.2,
    descricao: "Vista panorâmica da Baía do Guajará"
  },
  {
    id: 14,
    nome: "Hotel Amazônia Atlântico",
    endereco: "Av. Presidente Vargas, 132 - Campina",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 160.00,
    classificacao: 3.9,
    descricao: "Localização privilegiada no centro histórico"
  },
  {
    id: 15,
    nome: "Rede Andrade Pedregal",
    endereco: "Av. Senador Lemos, 231 - Umarizal",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 205.00,
    classificacao: 4.3,
    descricao: "Conforto e elegância no Umarizal"
  },
  {
    id: 16,
    nome: "Hotel Ver-o-Peso",
    endereco: "Av. Castilho França, 208 - Cidade Velha",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 145.00,
    classificacao: 3.8,
    descricao: "Próximo ao famoso Mercado Ver-o-Peso"
  },
  {
    id: 17,
    nome: "Manacá Hotel",
    endereco: "Rua Henrique Gurjão, 236 - Campina",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 170.00,
    classificacao: 4.0,
    descricao: "Hotel boutique no centro de Belém"
  },
  {
    id: 18,
    nome: "Hotel Regente",
    endereco: "Av. Gov. José Malcher, 1846 - Nazaré",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 150.00,
    classificacao: 3.9,
    descricao: "Bom custo-benefício na Nazaré"
  },
  {
    id: 19,
    nome: "Belém Palace Hotel",
    endereco: "Tv. Padre Eutíquio, 1322 - Batista Campos",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 185.00,
    classificacao: 4.1,
    descricao: "Hotel clássico no Batista Campos"
  },
  {
    id: 20,
    nome: "Hotel Vila Rica",
    endereco: "Av. Júlio César, 1777 - Val-de-Cans",
    cidade: "Belém",
    estado: "PA",
    pais: "Brasil",
    preco_diaria: 155.00,
    classificacao: 3.8,
    descricao: "Próximo ao aeroporto e shopping"
  },
  
  // Outros hotéis do Brasil
  {
    id: 21,
    nome: "Grand Hotel São Paulo",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
    preco_diaria: 200.00,
    classificacao: 4.8,
    descricao: "Hotel de luxo na Avenida Paulista"
  },
  {
    id: 22,
    nome: "Hotel Copacabana Beach",
    endereco: "Av. Atlântica, 500",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    pais: "Brasil",
    preco_diaria: 350.00,
    classificacao: 5.0,
    descricao: "Vista privilegiada para a praia de Copacabana"
  },
  {
    id: 23,
    nome: "Pousada Recanto Verde",
    endereco: "Estrada do Parque, 45",
    cidade: "Gramado",
    estado: "RS",
    pais: "Brasil",
    preco_diaria: 180.00,
    classificacao: 4.3,
    descricao: "Aconchego e natureza na serra gaúcha"
  },
  {
    id: 24,
    nome: "Hotel Marina Bay",
    endereco: "Av. Beira Mar, 200",
    cidade: "Florianópolis",
    estado: "SC",
    pais: "Brasil",
    preco_diaria: 220.00,
    classificacao: 4.6,
    descricao: "Vista para o mar e conforto"
  },
  {
    id: 25,
    nome: "Ibis Styles Salvador",
    endereco: "Av. Tancredo Neves, 3133",
    cidade: "Salvador",
    estado: "BA",
    pais: "Brasil",
    preco_diaria: 175.00,
    classificacao: 4.2,
    descricao: "Moderno hotel em Salvador"
  },
  {
    id: 26,
    nome: "Hotel Plaza Lisboa",
    endereco: "Rua das Flores, 123",
    cidade: "Lisboa",
    estado: "Lisboa",
    pais: "Portugal",
    preco_diaria: 150.00,
    classificacao: 4.5,
    descricao: "Hotel moderno no centro histórico de Lisboa"
  }
];

export function useHotels(params?: SearchParams) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    async function fetchHotels() {
      console.log('🔍 useHotels - Iniciando busca com params:', params);
      
      setLoading(true);
      setError(null);
      
      // SEMPRE usar dados MOCK (não precisa da API)
      console.log('📦 Usando dados MOCK do frontend');
      
      let filteredHotels = [...MOCK_HOTELS];
      
      console.log('📊 Total de hotéis MOCK disponíveis:', MOCK_HOTELS.length);
      console.log('🔎 Parâmetros de busca:', {
        search: params?.search,
        min_price: params?.min_price,
        max_price: params?.max_price
      });
      
      // Apply filters to mock data
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        console.log('🔍 Buscando por:', searchLower);
        
        filteredHotels = filteredHotels.filter(h => {
          const match = h.nome.toLowerCase().includes(searchLower) ||
                       h.cidade.toLowerCase().includes(searchLower) ||
                       h.endereco.toLowerCase().includes(searchLower);
          if (match) {
            console.log('✓ Match encontrado:', h.nome, '-', h.cidade);
          }
          return match;
        });
        console.log('📍 Após filtro de busca:', filteredHotels.length, 'hotéis');
      }
      
      if (params?.min_price) {
        const beforeFilter = filteredHotels.length;
        filteredHotels = filteredHotels.filter(h => h.preco_diaria >= params.min_price!);
        console.log('💰 Após filtro preço mínimo (R$', params.min_price, '):', filteredHotels.length, 'hotéis (antes:', beforeFilter, ')');
      }
      
      if (params?.max_price) {
        const beforeFilter = filteredHotels.length;
        filteredHotels = filteredHotels.filter(h => h.preco_diaria <= params.max_price!);
        console.log('💰 Após filtro preço máximo (R$', params.max_price, '):', filteredHotels.length, 'hotéis (antes:', beforeFilter, ')');
      }
      
      console.log('✅ RESULTADO FINAL:', filteredHotels.length, 'hotéis encontrados');
      console.log('🏨 Primeiros 5 hotéis:', filteredHotels.slice(0, 5).map(h => `${h.nome} (${h.cidade})`));
      
      setHotels(filteredHotels);
      setTotal(filteredHotels.length);
      setUseMock(true);
      setLoading(false);
      
      console.log('⏱️ Loading finalizado');
    }

    fetchHotels();
  }, [params]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    // SEMPRE usar dados MOCK
    let filteredHotels = [...MOCK_HOTELS];
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredHotels = filteredHotels.filter(h => 
        h.nome.toLowerCase().includes(searchLower) ||
        h.cidade.toLowerCase().includes(searchLower) ||
        h.endereco.toLowerCase().includes(searchLower)
      );
    }
    
    if (params?.min_price) {
      filteredHotels = filteredHotels.filter(h => h.preco_diaria >= params.min_price!);
    }
    
    if (params?.max_price) {
      filteredHotels = filteredHotels.filter(h => h.preco_diaria <= params.max_price!);
    }
    
    setHotels(filteredHotels);
    setTotal(filteredHotels.length);
    setUseMock(true);
    setLoading(false);
  };

  return { hotels, total, loading, error, refetch, useMock };
}
