# INSTRUÇÕES PARA REINICIAR O SERVIDOR

## 1. Pare todos os servidores Node.js/Next.js

**No Windows:**
1. Abra o **Task Manager** (Ctrl+Shift+Esc)
2. Vá para a aba **Detalhes**
3. Encontre todos os processos `node.exe`
4. Clique com botão direito e selecione **Finalizar tarefa**

**No PowerShell/CMD:**
```cmd
taskkill /F /IM node.exe
```

## 2. Inicie o servidor de desenvolvimento

**No terminal, na pasta do projeto:**
```cmd
cd C:\talentflow-ai\talentflow-ai
npm run dev
```

## 3. Acesse o site

O servidor deve iniciar em:
- **Local:** http://localhost:3000
- **Teste dropdown:** http://localhost:3000/test-dropdown

## 4. Teste a solução do dropdown

1. Acesse a página Dashboard: http://localhost:3000/dashboard
2. Clique no botão do perfil (canto superior direito)
3. O dropdown deve aparecer **ACIMA** de todos os outros elementos
4. Teste também na página: http://localhost:3000/test-dropdown

## Solução Implementada

O dropdown agora usa:
- **JavaScript direto** para mover o dropdown para `document.body`
- **z-index máximo** (2147483647) garantido
- **Script de backup** que executa a cada 100ms
- **CSS removendo** constraints de overflow

**O dropdown deve funcionar perfeitamente em todas as páginas agora!**