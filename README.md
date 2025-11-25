# 🏨 Hotel Finder - Frontend

Frontend Next.js 14 para o sistema de busca de hotéis.

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

### 2. Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado com:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_V1=/api/v1
```

### 3. Iniciar Backend

**IMPORTANTE:** O backend deve estar rodando antes de iniciar o frontend.

```bash
# Em outro terminal, navegue até Back-end/
cd ../Back-end

# Ative o ambiente virtual
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Inicie o servidor
uvicorn app.main:app --reload
```

O backend estará disponível em `http://localhost:8000`

### 4. Iniciar Frontend

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

Acesse: http://localhost:3000

## 📦 Estrutura

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── page.tsx           # Página inicial
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── Header.tsx         # Cabeçalho
│   ├── HotelCard.tsx      # Card de hotel
│   ├── SearchForm.tsx     # Formulário de busca
│   └── QuickSearch.tsx    # Busca rápida
├── hooks/                 # Custom Hooks
│   ├── useHotels.ts       # Hook para buscar hotéis
│   ├── useSearch.ts       # Hook para busca com debounce
│   └── useFilters.ts      # Hook para filtros
├── lib/                   # Bibliotecas
│   └── api.ts            # Cliente API
└── types/                 # TypeScript types
    └── hotel.ts          # Tipos de Hotel
```

## 🔌 API Client

O cliente da API está configurado em `src/lib/api.ts`:

```typescript
import { apiClient } from '@/lib/api';

// Buscar todos os hotéis
const { results, total } = await apiClient.getHotels();

// Buscar com filtros
const filtered = await apiClient.getHotels({
  cidade: 'Lisboa',
  max_price: 200
});

// Buscar por ID
const hotel = await apiClient.getHotelById(1);

// Busca rápida
const search = await apiClient.searchHotels('Plaza');
```

## 🎣 Hooks Customizados

### useHotels

Busca hotéis com filtros:

```typescript
import { useHotels } from '@/hooks/useHotels';

function MyComponent() {
  const { hotels, total, loading, error } = useHotels({
    cidade: 'Lisboa',
    max_price: 200
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {hotels.map(hotel => (
        <div key={hotel.id}>{hotel.nome}</div>
      ))}
    </div>
  );
}
```

### useSearch

Busca com debounce:

```typescript
import { useSearch } from '@/hooks/useSearch';

function SearchBar() {
  const { query, setQuery, results, loading } = useSearch();

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

### useFilters

Busca filtros disponíveis:

```typescript
import { useFilters } from '@/hooks/useFilters';

function Filters() {
  const { cities, priceRange, loading } = useFilters();

  return (
    <select>
      {cities.map(city => (
        <option key={city}>{city}</option>
      ))}
    </select>
  );
}
```

## 🎨 Componentes

### HotelCard

Exibe informações de um hotel:

```typescript
<HotelCard hotel={hotel} />
```

### SearchForm

Formulário de busca com filtros:

```typescript
<SearchForm onSearch={(params) => console.log(params)} />
```

### QuickSearch

Busca rápida com autocomplete:

```typescript
<QuickSearch />
```

## 🔧 Configuração Avançada

### Alterar URL da API

Edite o arquivo `.env`:

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
NEXT_PUBLIC_API_V1=/api/v1
```

### Timeout de Requisições

Modifique `src/lib/api.ts` para adicionar timeout:

```typescript
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000) // 5 segundos
});
```

## 🐛 Troubleshooting

### Erro: "Failed to fetch"

1. Verifique se o backend está rodando
2. Verifique a URL em `.env`
3. Verifique CORS no backend

### Erro: "Cannot find module"

```bash
# Reinstale as dependências
rm -rf node_modules
npm install
```

### Backend não responde

```bash
# Verifique se o backend está rodando
curl http://localhost:8000/health

# Se não responder, inicie o backend
cd ../Back-end
uvicorn app.main:app --reload
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build para Produção

```bash
npm run build
npm start
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa linter
