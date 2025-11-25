# 🏨 Sistema de Hotel Finder

## Documentação Técnica Completa

**Versão:** 1.0.0  
**Última Atualização:** Novembro 2025  
**Autor:** Equipe de Desenvolvimento

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Instalação e Configuração](#instalação-e-configuração)
6. [Dataset e Modelo de Dados](#dataset-e-modelo-de-dados)
7. [API Backend - FastAPI](#api-backend---fastapi)
8. [Frontend - Next.js](#frontend---nextjs)
9. [Integração Frontend ↔ Backend](#integração-frontend--backend)
10. [Arquitetura de Código](#arquitetura-de-código)
11. [Guia de Desenvolvimento](#guia-de-desenvolvimento)
12. [Testes](#testes)
13. [Deploy e Produção](#deploy-e-produção)
14. [Melhores Práticas](#melhores-práticas)
15. [Troubleshooting](#troubleshooting)
16. [Roadmap](#roadmap)
17. [FAQ](#faq)
18. [Referências](#referências)

---

## 🎯 Visão Geral

### Descrição do Projeto

O Sistema de Busca de Hotéis é uma aplicação web full-stack desenvolvida com arquitetura moderna, que permite aos usuários pesquisar, filtrar e visualizar informações sobre hotéis. A aplicação combina a performance do Next.js no frontend com a eficiência do FastAPI no backend, utilizando um dataset Excel (XLSX) como fonte inicial de dados.

### Objetivos Principais

- Fornecer interface intuitiva para busca de hotéis
- Implementar filtros avançados (preço, localização, classificação)
- Garantir performance e escalabilidade
- Manter código limpo e manutenível
- Facilitar migração futura para banco de dados

### Características Principais

✅ **Busca em tempo real** - Resultados instantâneos conforme digitação  
✅ **Filtros múltiplos** - Por cidade, preço, estrelas e mais  
✅ **Responsive Design** - Funciona em desktop, tablet e mobile  
✅ **API RESTful** - Endpoints bem documentados e padronizados  
✅ **Arquitetura escalável** - Preparada para crescimento  
✅ **Documentação interativa** - Swagger/OpenAPI integrado

### Público-Alvo

- Usuários finais buscando acomodações
- Desenvolvedores que desejam integrar com a API
- Administradores do sistema

---

## 🏗️ Arquitetura do Sistema

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CAMADA DE APRESENTAÇÃO                   │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │    Mobile    │  │   Desktop    │          │
│  │  (React UI)  │  │     App      │  │     App      │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CAMADA DE APLICAÇÃO                         │
│                                                                   │
│                      ┌──────────────────┐                        │
│                      │   Next.js 14+    │                        │
│                      │   (Frontend)     │                        │
│                      │                  │                        │
│                      │  • App Router    │                        │
│                      │  • Components    │                        │
│                      │  • TailwindCSS   │                        │
│                      └────────┬─────────┘                        │
│                               │                                   │
└───────────────────────────────┼──────────────────────────────────┘
                                │ HTTP/REST
                                │ (JSON)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CAMADA DE API                             │
│                                                                   │
│                      ┌──────────────────┐                        │
│                      │   FastAPI        │                        │
│                      │   (Backend)      │                        │
│                      │                  │                        │
│                      │  • Routers       │                        │
│                      │  • Middleware    │                        │
│                      │  • Validation    │                        │
│                      └────────┬─────────┘                        │
│                               │                                   │
└───────────────────────────────┼──────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAMADA DE NEGÓCIO                             │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Services   │  │    Utils     │  │    Core      │          │
│  │              │  │              │  │              │          │
│  │ • Business   │  │ • Helpers    │  │ • Config     │          │
│  │   Logic      │  │ • Validators │  │ • Constants  │          │
│  │ • Filters    │  │ • Formatters │  │ • Settings   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘          │
│         │                  │                                      │
└─────────┼──────────────────┼─────────────────────────────────────┘
          │                  │
          └──────────┬───────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CAMADA DE DADOS                              │
│                                                                   │
│                    ┌────────────────┐                            │
│                    │  Data Access   │                            │
│                    │                │                            │
│                    │ • XLSX Reader  │                            │
│                    │ • Cache Layer  │                            │
│                    │ • Models       │                            │
│                    └───────┬────────┘                            │
│                            │                                      │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  hoteis.xlsx    │
                    │  (Dataset)      │
                    └─────────────────┘
```

### Fluxo de Dados

#### 1. Fluxo de Busca Completo

```
┌──────────┐
│ Usuário  │
│ digita   │
│ "Hotel"  │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────┐
│ Frontend (Next.js)              │
│                                 │
│ 1. Captura input                │
│ 2. Valida entrada               │
│ 3. Aplica debounce (300ms)      │
│ 4. Monta requisição             │
└────┬────────────────────────────┘
     │
     │ GET /hotels?q=Hotel
     │ Headers: Content-Type: application/json
     │
     ▼
┌─────────────────────────────────┐
│ Backend (FastAPI)               │
│                                 │
│ 1. Recebe requisição            │
│ 2. Valida parâmetros (Pydantic)│
│ 3. Chama HotelsService          │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ HotelsService                   │
│                                 │
│ 1. Chama read_xlsx()            │
│ 2. Aplica filtros               │
│ 3. Ordena resultados            │
│ 4. Formata resposta             │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Utils: read_xlsx()              │
│                                 │
│ 1. Verifica cache               │
│ 2. Lê arquivo XLSX              │
│ 3. Converte para DataFrame      │
│ 4. Retorna dados                │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Resposta JSON                   │
│                                 │
│ {                               │
│   "total": 5,                   │
│   "results": [...]              │
│ }                               │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Frontend renderiza              │
│                                 │
│ • Lista de cards                │
│ • Informações do hotel          │
│ • Botões de ação                │
└─────────────────────────────────┘
```

### Padrões Arquiteturais Utilizados

#### Clean Architecture

A aplicação segue os princípios da Clean Architecture:

- **Independência de Frameworks**: A lógica de negócio não depende de frameworks específicos
- **Testabilidade**: Cada camada pode ser testada independentemente
- **Independência de UI**: A interface pode ser alterada sem afetar as regras de negócio
- **Independência de Banco de Dados**: Fácil migração de XLSX para SQL

#### Repository Pattern

Preparado para implementação futura:

```python
# Estrutura futura
class HotelRepository:
    def get_all(self) -> List[Hotel]
    def get_by_id(self, id: int) -> Hotel
    def search(self, query: str) -> List[Hotel]
    def filter(self, filters: dict) -> List[Hotel]
```

#### Service Layer Pattern

Toda lógica de negócio está encapsulada em services:

```python
class HotelsService:
    def __init__(self, data_source):
        self.data_source = data_source
    
    def search_hotels(self, query: str, filters: dict):
        # Lógica de busca e filtragem
        pass
```

---

## 💻 Tecnologias Utilizadas

### Stack Completo

#### Frontend

| Tecnologia | Versão | Descrição | Documentação |
|------------|--------|-----------|--------------|
| **Next.js** | 14.2+ | Framework React com SSR/SSG | [docs](https://nextjs.org/docs) |
| **React** | 18.3+ | Biblioteca UI | [docs](https://react.dev) |
| **TypeScript** | 5.0+ | Superset JavaScript tipado | [docs](https://www.typescriptlang.org/docs) |
| **TailwindCSS** | 3.4+ | Framework CSS utilitário | [docs](https://tailwindcss.com/docs) |
| **Axios** | 1.6+ | Cliente HTTP | [docs](https://axios-http.com/docs) |
| **React Query** | 5.0+ | State management para requisições | [docs](https://tanstack.com/query) |
| **Zod** | 3.22+ | Validação de schemas | [docs](https://zod.dev) |

#### Backend

| Tecnologia | Versão | Descrição | Documentação |
|------------|--------|-----------|--------------|
| **Python** | 3.10+ | Linguagem de programação | [docs](https://docs.python.org/3/) |
| **FastAPI** | 0.108+ | Framework web moderno | [docs](https://fastapi.tiangolo.com) |
| **Uvicorn** | 0.25+ | Servidor ASGI | [docs](https://www.uvicorn.org) |
| **Pydantic** | 2.5+ | Validação de dados | [docs](https://docs.pydantic.dev) |
| **Pandas** | 2.1+ | Análise de dados | [docs](https://pandas.pydata.org/docs) |
| **openpyxl** | 3.1+ | Leitura/escrita XLSX | [docs](https://openpyxl.readthedocs.io) |
| **python-dotenv** | 1.0+ | Variáveis de ambiente | [docs](https://pypi.org/project/python-dotenv/) |

#### Ferramentas de Desenvolvimento

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| **Git** | 2.40+ | Controle de versão |
| **Docker** | 24.0+ | Containerização |
| **pytest** | 7.4+ | Testes Python |
| **Jest** | 29.7+ | Testes JavaScript |
| **ESLint** | 8.56+ | Linter JavaScript |
| **Prettier** | 3.1+ | Formatação de código |
| **Black** | 23.12+ | Formatação Python |

### Justificativa das Escolhas

#### Por que Next.js?

- **SSR/SSG**: Melhor SEO e performance
- **App Router**: Roteamento moderno e intuitivo
- **API Routes**: Backend integrado para pequenas operações
- **Otimização automática**: Imagens, fontes e assets
- **TypeScript**: Suporte nativo

#### Por que FastAPI?

- **Performance**: Um dos frameworks Python mais rápidos
- **Type Hints**: Validação automática com Pydantic
- **Documentação automática**: Swagger UI integrado
- **Async/Await**: Suporte nativo a operações assíncronas
- **Moderna**: Baseada em padrões atuais (OpenAPI, JSON Schema)

#### Por que XLSX?

- **Simplicidade inicial**: Rápido para prototipar
- **Portabilidade**: Fácil compartilhamento de dados
- **Familiaridade**: Formato conhecido por todos
- **Migração planejada**: Estrutura preparada para SQL

---

## 📁 Estrutura de Pastas

### Visão Geral da Estrutura

```
meu-buscador-hoteis/
│
├── frontend/                           # Aplicação Next.js
│   ├── .next/                          # Build do Next.js (gerado)
│   ├── public/                         # Assets estáticos
│   │   ├── images/
│   │   ├── icons/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/                        # App Router (Next.js 14+)
│   │   │   ├── layout.tsx              # Layout raiz
│   │   │   ├── page.tsx                # Página inicial
│   │   │   ├── hotels/
│   │   │   │   ├── page.tsx            # Lista de hotéis
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Detalhes do hotel
│   │   │   └── globals.css             # Estilos globais
│   │   │
│   │   ├── components/                 # Componentes React
│   │   │   ├── ui/                     # Componentes base
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Loading.tsx
│   │   │   │
│   │   │   ├── layout/                 # Componentes de layout
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   │
│   │   │   └── features/               # Componentes de features
│   │   │       ├── SearchBar.tsx
│   │   │       ├── HotelCard.tsx
│   │   │       ├── FilterPanel.tsx
│   │   │       └── HotelDetails.tsx
│   │   │
│   │   ├── lib/                        # Bibliotecas e utilitários
│   │   │   ├── api.ts                  # Cliente API
│   │   │   ├── utils.ts                # Funções auxiliares
│   │   │   └── constants.ts            # Constantes
│   │   │
│   │   ├── types/                      # Definições TypeScript
│   │   │   ├── hotel.ts
│   │   │   └── api.ts
│   │   │
│   │   └── hooks/                      # Custom Hooks
│   │       ├── useHotels.ts
│   │       ├── useSearch.ts
│   │       └── useFilters.ts
│   │
│   ├── .env.local                      # Variáveis de ambiente (local)
│   ├── .env.example                    # Exemplo de variáveis
│   ├── .eslintrc.json                  # Configuração ESLint
│   ├── .prettierrc                     # Configuração Prettier
│   ├── next.config.js                  # Configuração Next.js
│   ├── tailwind.config.ts              # Configuração Tailwind
│   ├── tsconfig.json                   # Configuração TypeScript
│   ├── package.json                    # Dependências Node
│   └── package-lock.json
│
├── backend/                            # API FastAPI
│   ├── app/
│   │   ├── api/                        # Rotas da API
│   │   │   ├── __init__.py
│   │   │   ├── deps.py                 # Dependências injetáveis
│   │   │   └── v1/                     # Versionamento da API
│   │   │       ├── __init__.py
│   │   │       ├── endpoints/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── hotels.py       # Endpoints de hotéis
│   │   │       │   └── health.py       # Health check
│   │   │       └── api.py              # Agregador de rotas
│   │   │
│   │   ├── core/                       # Configurações centrais
│   │   │   ├── __init__.py
│   │   │   ├── config.py               # Settings da aplicação
│   │   │   └── security.py             # Segurança (futuro)
│   │   │
│   │   ├── models/                     # Modelos Pydantic
│   │   │   ├── __init__.py
│   │   │   ├── hotel.py                # Schema Hotel
│   │   │   └── response.py             # Schemas de resposta
│   │   │
│   │   ├── services/                   # Lógica de negócio
│   │   │   ├── __init__.py
│   │   │   └── hotels_service.py       # Serviço de hotéis
│   │   │
│   │   ├── utils/                      # Utilitários
│   │   │   ├── __init__.py
│   │   │   ├── read_xlsx.py            # Leitor XLSX
│   │   │   ├── validators.py           # Validadores customizados
│   │   │   └── formatters.py           # Formatadores de dados
│   │   │
│   │   ├── db/                         # Camada de dados (futuro)
│   │   │   ├── __init__.py
│   │   │   ├── base.py                 # Base SQLAlchemy
│   │   │   ├── session.py              # Sessão do banco
│   │   │   ├── models.py               # Modelos ORM
│   │   │   └── seeds.py                # Seeds
│   │   │
│   │   ├── middleware/                 # Middlewares customizados
│   │   │   ├── __init__.py
│   │   │   ├── cors.py
│   │   │   └── logging.py
│   │   │
│   │   ├── tests/                      # Testes
│   │   │   ├── __init__.py
│   │   │   ├── conftest.py             # Fixtures pytest
│   │   │   ├── test_api/
│   │   │   │   └── test_hotels.py
│   │   │   └── test_services/
│   │   │       └── test_hotels_service.py
│   │   │
│   │   └── main.py                     # Ponto de entrada
│   │
│   ├── .env                            # Variáveis de ambiente
│   ├── .env.example                    # Exemplo de variáveis
│   ├── .gitignore                      # Arquivos ignorados
│   ├── requirements.txt                # Dependências Python
│   ├── requirements-dev.txt            # Dependências de dev
│   ├── pytest.ini                      # Configuração pytest
│   └── pyproject.toml                  # Configuração do projeto
│
├── dataset/                            # Dados
│   ├── hoteis.xlsx                     # Dataset principal
│   ├── hoteis_backup.xlsx              # Backup
│   └── schema.json                     # Schema dos dados
│
├── docs/                               # Documentação adicional
│   ├── api/
│   │   └── swagger.yaml                # Especificação OpenAPI
│   ├── architecture/
│   │   ├── diagrams/
│   │   └── decisions.md                # ADRs
│   └── guides/
│       ├── setup.md
│       └── deployment.md
│
├── scripts/                            # Scripts utilitários
│   ├── seed_data.py                    # Popular dados
│   ├── migrate_to_sql.py               # Migração para SQL
│   └── backup.sh                       # Backup automático
│
├── .gitignore                          # Git ignore global
├── docker-compose.yml                  # Orquestração Docker
├── Dockerfile.backend                  # Imagem Docker backend
├── Dockerfile.frontend                 # Imagem Docker frontend
├── README.md                           # Este arquivo
└── LICENSE                             # Licença do projeto
```

### Descrição Detalhada

#### Frontend (`/frontend`)

**`src/app/`** - App Router do Next.js 14+
- Estrutura baseada em sistema de arquivos
- Cada pasta representa uma rota
- `layout.tsx`: Layout compartilhado
- `page.tsx`: Componente da página
- `loading.tsx`: Loading state automático
- `error.tsx`: Error boundary automático

**`src/components/`** - Componentes React organizados por tipo
- `ui/`: Componentes reutilizáveis básicos (botões, inputs)
- `layout/`: Componentes estruturais (header, footer)
- `features/`: Componentes específicos de features

**`src/lib/`** - Código compartilhado
- Cliente da API
- Funções utilitárias
- Constantes da aplicação

**`src/types/`** - Definições TypeScript
- Interfaces e tipos
- Mantém consistência de tipos

**`src/hooks/`** - Custom React Hooks
- Lógica reutilizável
- State management específico

#### Backend (`/backend/app`)

**`api/`** - Camada de apresentação
- Rotas e endpoints
- Versionamento (v1, v2...)
- Validação de entrada
- Formatação de resposta

**`core/`** - Núcleo da aplicação
- Configurações globais
- Settings
- Constantes

**`models/`** - Schemas Pydantic
- Validação de dados
- Serialização/Deserialização
- Documentação automática

**`services/`** - Lógica de negócio
- Regras de negócio
- Processamento de dados
- Orquestração

**`utils/`** - Utilitários
- Funções auxiliares
- Helpers
- Formatadores

**`db/`** - Camada de dados
- Preparada para migração SQL
- Modelos ORM (futuro)
- Migrations (futuro)

**`middleware/`** - Middlewares
- CORS
- Logging
- Autenticação (futuro)

**`tests/`** - Testes automatizados
- Testes unitários
- Testes de integração
- Fixtures

---

## 🚀 Instalação e Configuração

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

| Software | Versão Mínima | Comando de Verificação |
|----------|---------------|------------------------|
| **Python** | 3.10 | `python --version` |
| **Node.js** | 18.0 | `node --version` |
| **npm** | 9.0 | `npm --version` |
| **Git** | 2.30 | `git --version` |

### Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/meu-buscador-hoteis.git

# Entre no diretório
cd meu-buscador-hoteis
```

### Configuração do Backend

#### 1. Criar Ambiente Virtual

```bash
# Navegue para o diretório do backend
cd backend

# Crie o ambiente virtual
python -m venv venv

# Ative o ambiente virtual

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

# Verifique se está ativo (deve mostrar (venv) no prompt)
```

#### 2. Instalar Dependências

```bash
# Instale as dependências de produção
pip install -r requirements.txt

# Para desenvolvimento, instale também:
pip install -r requirements-dev.txt
```

**requirements.txt:**
```txt
fastapi==0.108.0
uvicorn[standard]==0.25.0
pydantic==2.5.3
pydantic-settings==2.1.0
pandas==2.1.4
openpyxl==3.1.2
python-dotenv==1.0.0
python-multipart==0.0.6
```

**requirements-dev.txt:**
```txt
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
black==23.12.1
flake8==7.0.0
mypy==1.8.0
```

#### 3. Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas configurações
nano .env  # ou seu editor preferido
```

**.env:**
```env
# Aplicação
APP_NAME="Sistema de Busca de Hotéis"
APP_VERSION="1.0.0"
DEBUG=True
ENVIRONMENT=development

# Servidor
HOST=0.0.0.0
PORT=8000

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Dataset
DATASET_PATH=../dataset/hoteis.xlsx

# Cache
ENABLE_CACHE=True
CACHE_TTL=300

# Logs
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
```

#### 4. Executar o Backend

```bash
# Desenvolvimento (com hot-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Produção
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Verificação:**
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Redoc: http://localhost:8000/redoc

### Configuração do Frontend

#### 1. Instalar Dependências

```bash
# Navegue para o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Ou usando yarn
yarn install
```

**package.json** (dependências principais):
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0",
    "zod": "^3.22.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.1.0"
  }
}
```

#### 2. Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite com suas configurações
nano .env.local
```

**.env.local:**
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1

# Aplicação
NEXT_PUBLIC_APP_NAME=Busca de Hotéis
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_FILTERS=true
NEXT_PUBLIC_ENABLE_FAVORITES=true
```

#### 3. Configurações Adicionais

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages