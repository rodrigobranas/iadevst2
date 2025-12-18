# Tarefa 2.0: Frontend - Migrar arquivos JSX para TSX e criar tipos

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Migrar os arquivos existentes de JSX para TSX e criar as interfaces TypeScript necessárias para tipagem forte do projeto. Esta tarefa prepara a base para os componentes da UI.

<requirements>
- Migrar `App.jsx` para `App.tsx`
- Migrar `main.jsx` para `main.tsx`
- Criar arquivo de tipos `types/plan.ts` com interfaces Plan, Tool e PlansResponse
- Apagar arquivos `.jsx` após criar os `.tsx`
- Garantir que o projeto compila sem erros de tipagem
</requirements>

## Subtarefas

- [ ] 2.1 Criar arquivo `frontend/src/types/plan.ts` com as interfaces TypeScript
- [ ] 2.2 Migrar `frontend/src/App.jsx` para `frontend/src/App.tsx`
- [ ] 2.3 Migrar `frontend/src/main.jsx` para `frontend/src/main.tsx`
- [ ] 2.4 Apagar arquivos `.jsx` originais
- [ ] 2.5 Verificar compilação TypeScript (`npx tsc --noEmit`)
- [ ] 2.6 Criar testes para validar que a aplicação renderiza corretamente

## Detalhes de Implementação

Consultar a seção **"Interfaces Principais"** na `techspec.md` para:
- Interface `Plan` com campos: id, name, price, limits, models, highlights
- Interface `Tool` com campos: id, name, slug, plans
- Interface `PlansResponse` com campo: tools

**Interfaces a criar:**
```typescript
interface Plan {
  id: string;
  name: string;
  price: number;
  limits: string[];
  models: string[];
  highlights: string[];
}

interface Tool {
  id: string;
  name: string;
  slug: string;
  plans: Plan[];
}

interface PlansResponse {
  tools: Tool[];
}
```

## Critérios de Sucesso

- Arquivos `.tsx` criados e funcionando
- Arquivos `.jsx` removidos
- Comando `npx tsc --noEmit` executa sem erros
- Aplicação renderiza corretamente no browser
- Tipos exportados e disponíveis para uso nos próximos componentes

## Testes da Tarefa

- [ ] Testes de unidade
  - Teste que App.tsx renderiza sem erros
  - Teste que tipos estão corretamente definidos (verificação de compilação)
- [ ] Testes de integração
  - Teste que a aplicação inicia corretamente

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `frontend/src/types/plan.ts` (novo)
- `frontend/src/App.jsx` → `frontend/src/App.tsx` (migrar)
- `frontend/src/main.jsx` → `frontend/src/main.tsx` (migrar)
- `frontend/tsconfig.json` (verificar configuração)
