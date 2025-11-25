# 🔧 Solução de Problemas - Erro de Módulo não Encontrado

## ✅ PROBLEMA RESOLVIDO!

O erro `Module not found: Can't resolve '@/hooks/useHotels'` foi corrigido.

### 🔍 Causa do Erro

O `tsconfig.json` tinha o caminho `@/*` mapeado incorretamente para `./*` em vez de `./src/*`.

### ✅ Correções Aplicadas

1. **tsconfig.json** - Atualizado o caminho:
   ```json
   "paths": {
     "@/*": ["./src/*"]  // ✅ Correto
   }
   ```

2. **next.config.ts** - Adicionada configuração do Turbopack:
   ```typescript
   turbopack: {
     root: __dirname,
   }
   ```

3. **Script de limpeza** criado: `clean-and-start.bat`

---

## 🚀 COMO REINICIAR CORRETAMENTE

### Opção 1: Script Automático (Recomendado)

```bash
cd Hotel-finder-2
clean-and-start.bat
```

Este script:
- ✅ Remove a pasta `.next` (cache)
- ✅ Reinicia o servidor automaticamente

### Opção 2: Manual

1. **Pare o servidor** (Ctrl + C no terminal)

2. **Limpe o cache:**
   ```bash
   # Usando PowerShell
   Remove-Item -Recurse -Force .next
   
   # Ou manualmente:
   # Apague a pasta .next no explorador de arquivos
   ```

3. **Reinicie o servidor:**
   ```bash
   pnpm dev
   ```

---

## 🔍 OUTROS ERROS COMUNS E SOLUÇÕES

### Erro: "EPERM: operation not permitted"

**Causa:** Arquivos bloqueados por outro processo (antivírus, VS Code, etc.)

**Solução:**
1. Feche o VS Code
2. Pare o servidor Next.js (Ctrl + C)
3. Delete a pasta `.next` manualmente
4. Reabra o VS Code
5. Execute `pnpm dev`

### Erro: "Port 3000 already in use"

**Causa:** Outro processo usando a porta 3000

**Solução:**
```bash
# Windows - Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou use outra porta:
pnpm dev -p 3001
```

### Erro: "Module not found" para outros imports

**Causa:** Caminhos incorretos no tsconfig.json

**Solução:**
1. Verifique se `tsconfig.json` tem:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```
2. Limpe o cache: delete `.next`
3. Reinicie o servidor

### Warning sobre lockfiles múltiplos

**Causa:** Existem arquivos `pnpm-lock.yaml` em várias pastas

**Solução:** Já foi corrigida adicionando `turbopack.root` no `next.config.ts`

---

## 📋 CHECKLIST DE TROUBLESHOOTING

Se o erro persistir, siga esta ordem:

- [ ] Pare o servidor (Ctrl + C)
- [ ] Delete a pasta `.next`
- [ ] Verifique `tsconfig.json` tem `"@/*": ["./src/*"]`
- [ ] Verifique que `src/hooks/useHotels.ts` existe
- [ ] Feche e reabra o VS Code
- [ ] Execute `pnpm install` (por garantia)
- [ ] Execute `pnpm dev`
- [ ] Aguarde a compilação completa

---

## 🎯 COMANDOS ÚTEIS

### Limpar tudo e reinstalar:
```bash
# Limpar cache
rm -rf .next node_modules

# Reinstalar dependências
pnpm install

# Iniciar
pnpm dev
```

### Verificar porta em uso:
```bash
# Windows
netstat -ano | findstr :3000

# Ver processos Node
tasklist | findstr node
```

### Forçar porta diferente:
```bash
pnpm dev -p 3001
```

---

## ✅ VERIFICAÇÃO FINAL

Depois de reiniciar, você deve ver:

```
✓ Starting...
✓ Ready in X.Xs
○ Compiling / ...
✓ Compiled / in Xs
```

**SEM** erros de "Module not found"!

---

## 🎉 PRONTO!

O projeto agora deve iniciar sem erros. Acesse:
- http://localhost:3000
- http://localhost:3000/test

---

## 📞 AINDA COM PROBLEMAS?

Se o erro persistir:

1. Compartilhe o erro completo
2. Verifique se o arquivo `src/hooks/useHotels.ts` existe
3. Verifique o conteúdo do `tsconfig.json`
4. Tente reiniciar o computador (em último caso)

**Nota:** Sempre limpe o cache (`.next`) quando fizer mudanças em arquivos de configuração!
