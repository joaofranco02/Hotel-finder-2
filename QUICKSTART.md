# 🚀 Guia Rápido - Como Iniciar o Projeto

## 📋 Pré-requisitos

- ✅ Python 3.10+ instalado
- ✅ Node.js 18+ instalado
- ✅ npm/pnpm/yarn instalado

## 🎯 Passos para Iniciar

### 1️⃣ Iniciar o Backend (API)

Abra um terminal e execute:

```bash
# Navegar até a pasta do backend
cd Back-end

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Criar dataset de exemplo
python create_dataset.py

# Iniciar o servidor
uvicorn app.main:app --reload
```

✅ **Backend rodando em:** http://localhost:8000  
📚 **Documentação:** http://localhost:8000/docs

---

### 2️⃣ Iniciar o Frontend

Abra **OUTRO TERMINAL** e execute:

```bash
# Navegar até a pasta do frontend
cd hotel-finder-front

# Instalar dependências (primeira vez)
npm install
# ou
pnpm install

# Iniciar o servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

✅ **Frontend rodando em:** http://localhost:3000

---

## ✨ Pronto!

Agora você tem:
- 🔥 Backend rodando na porta 8000
- 🎨 Frontend rodando na porta 3000
- 🔗 Frontend conectado ao Backend

### Acesse:
- **Site:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs
- **API ReDoc:** http://localhost:8000/redoc

---

## 🎯 Testando

1. Acesse http://localhost:3000
2. Você verá a lista de hotéis carregada da API
3. Use o formulário de busca para filtrar
4. Os resultados virão do backend em tempo real

---

## 🐛 Problemas?

### Backend não inicia?

```bash
# Verifique a versão do Python
python --version

# Reinstale as dependências
pip install -r requirements.txt
```

### Frontend não inicia?

```bash
# Limpe e reinstale
rm -rf node_modules
npm install
```

### Frontend não conecta ao backend?

1. Verifique se o backend está rodando em http://localhost:8000
2. Teste: `curl http://localhost:8000/health`
3. Verifique o arquivo `.env` no frontend

---

## 📝 Variáveis de Ambiente

O arquivo `.env` no frontend já está configurado:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_V1=/api/v1
```

Se o backend estiver em outra porta, altere este arquivo.

---

## 💡 Dicas

- Mantenha **2 terminais abertos**: um para backend, outro para frontend
- O backend precisa estar rodando ANTES do frontend
- Use `Ctrl+C` para parar os servidores
- O hot reload está ativado: mudanças são refletidas automaticamente

---

## 🎊 Sucesso!

Seu projeto Hotel Finder está rodando! 🎉
