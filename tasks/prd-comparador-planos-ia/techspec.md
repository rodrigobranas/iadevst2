# Tech Spec - Comparador de Planos de IA

## Resumo Executivo

Esta especificação técnica define a implementação de um comparador interativo de planos de ferramentas de IA para desenvolvedores. A arquitetura segue uma separação clara entre frontend (React + TypeScript + Tailwind) e backend (Express + TypeScript), com dados servidos via API REST. O frontend utilizará shadcn/ui para componentes (Slider, Cards), filtragem client-side para latência zero, e suporte a Dark Mode com toggle manual. A migração de `.jsx` para `.tsx` será realizada como parte do escopo.

## Arquitetura do Sistema

### Visão Geral dos Componentes

**Backend (Express):**
- **`src/index.ts`** - Servidor Express existente, será modificado para incluir novo endpoint
- **`src/routes/plans.route.ts`** (novo) - Rota para servir dados dos planos
- **`src/data/plans.json`** (novo) - Arquivo JSON com dados dos planos

**Frontend (React + TypeScript):**
- **`src/App.tsx`** (migração de .jsx) - Componente raiz com ThemeProvider e layout principal
- **`src/components/BudgetSlider.tsx`** (novo) - Slider interativo de orçamento com shadcn/ui
- **`src/components/ToolsGrid.tsx`** (novo) - Grid de 4 colunas com ferramentas
- **`src/components/PlanCard.tsx`** (novo) - Card individual de plano (Bento style)
- **`src/components/ThemeToggle.tsx`** (novo) - Toggle Dark/Light mode
- **`src/components/ui/slider.tsx`** (novo) - Componente shadcn/ui Slider
- **`src/hooks/usePlans.ts`** (novo) - Hook para fetch e filtragem de planos
- **`src/hooks/useTheme.ts`** (novo) - Hook para gerenciamento de tema
- **`src/types/plan.ts`** (novo) - Tipos TypeScript para planos
- **`src/main.tsx`** (migração de .jsx) - Entry point

**Fluxo de Dados:**
```
Backend (GET /api/plans) → usePlans hook → ToolsGrid → PlanCard
                                ↑
                         BudgetSlider (budget state)
```

## Design de Implementação

### Interfaces Principais

```typescript
// src/types/plan.ts
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

```typescript
// src/hooks/usePlans.ts
interface UsePlansReturn {
  tools: Tool[];
  isLoading: boolean;
  error: Error | null;
  filterByBudget: (budget: number) => Tool[];
}
```

### Modelos de Dados

**JSON de Planos (`backend/src/data/plans.json`):**
```json
{
  "tools": [
    {
      "id": "github-copilot",
      "name": "GitHub Copilot",
      "slug": "copilot",
      "plans": [
        {
          "id": "copilot-free",
          "name": "Free",
          "price": 0,
          "limits": ["2000 completions/month", "50 chat requests/month"],
          "models": ["GPT-4.1", "Haiku 4.5"],
          "highlights": ["Basic code completion"]
        },
        {
          "id": "copilot-pro",
          "name": "Pro",
          "price": 10,
          "limits": ["Unlimited completions", "300 premium requests/month"],
          "models": ["GPT-5", "Claude Sonnet 4", "Gemini 2.5 Pro"],
          "highlights": ["Coding agent", "Code review"]
        },
        {
          "id": "copilot-pro-plus",
          "name": "Pro+",
          "price": 39,
          "limits": ["Unlimited completions", "1500 premium requests/month"],
          "models": ["All models", "Claude Opus 4.1"],
          "highlights": ["5x more premium requests", "GitHub Spark"]
        }
      ]
    },
    {
      "id": "cursor",
      "name": "Cursor",
      "slug": "cursor",
      "plans": [
        {
          "id": "cursor-free",
          "name": "Hobby",
          "price": 0,
          "limits": ["Limited Agent requests", "Limited Tab completions"],
          "models": ["Basic models"],
          "highlights": ["One-week Pro trial"]
        },
        {
          "id": "cursor-pro",
          "name": "Pro",
          "price": 20,
          "limits": ["Extended Agent limits", "Unlimited Tab completions"],
          "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini"],
          "highlights": ["Background Agents", "Maximum context windows"]
        },
        {
          "id": "cursor-pro-plus",
          "name": "Pro+",
          "price": 60,
          "limits": ["3x usage on all models"],
          "models": ["All OpenAI, Claude, Gemini models"],
          "highlights": ["3x usage multiplier"]
        },
        {
          "id": "cursor-ultra",
          "name": "Ultra",
          "price": 200,
          "limits": ["20x usage on all models"],
          "models": ["All OpenAI, Claude, Gemini models"],
          "highlights": ["20x usage multiplier", "Priority access"]
        }
      ]
    },
    {
      "id": "claude-code",
      "name": "Claude Code",
      "slug": "claude",
      "plans": [
        {
          "id": "claude-pro",
          "name": "Pro",
          "price": 20,
          "limits": ["Standard usage"],
          "models": ["Sonnet 4.5", "Opus 4.5"],
          "highlights": ["Claude Code included", "Web + Terminal"]
        },
        {
          "id": "claude-max-5x",
          "name": "Max 5x",
          "price": 100,
          "limits": ["5x more usage than Pro"],
          "models": ["Sonnet 4.5", "Opus 4.5"],
          "highlights": ["Memory across conversations", "Priority access"]
        },
        {
          "id": "claude-max-20x",
          "name": "Max 20x",
          "price": 200,
          "limits": ["20x more usage than Pro"],
          "models": ["Sonnet 4.5", "Opus 4.5"],
          "highlights": ["Higher output limits", "Early access to features"]
        }
      ]
    },
    {
      "id": "windsurf",
      "name": "Windsurf",
      "slug": "windsurf",
      "plans": [
        {
          "id": "windsurf-free",
          "name": "Free",
          "price": 0,
          "limits": ["Basic usage"],
          "models": ["Standard models"],
          "highlights": ["Free forever"]
        },
        {
          "id": "windsurf-pro",
          "name": "Pro",
          "price": 15,
          "limits": ["Extended usage"],
          "models": ["All major models"],
          "highlights": ["Cascade AI", "Deep context awareness"]
        },
        {
          "id": "windsurf-teams",
          "name": "Teams",
          "price": 30,
          "limits": ["Team pooled usage"],
          "models": ["All major models"],
          "highlights": ["Team management", "Usage analytics"]
        }
      ]
    }
  ]
}
```

### Endpoints de API

| Método | Caminho | Descrição |
|--------|---------|-----------|
| `GET` | `/api/plans` | Retorna todos os planos de todas as ferramentas |

**Response:**
```json
{
  "tools": [...]
}
```

## Pontos de Integração

- **shadcn/ui Slider**: Requer instalação de `@radix-ui/react-slider`
- **Fetch API**: Comunicação frontend ↔ backend via `fetch` nativo
- **LocalStorage**: Persistência da preferência de tema

## Abordagem de Testes

### Testes de Unidade

**Backend:**
- Teste do endpoint `/api/plans` retornando estrutura correta
- Teste de formato do JSON de planos

**Frontend:**
- `usePlans.test.ts`: Teste de filtragem por orçamento
- `useTheme.test.ts`: Teste de toggle e persistência
- `BudgetSlider.test.tsx`: Teste de interação e valores
- `PlanCard.test.tsx`: Teste de renderização de dados

**Cenários críticos:**
- Filtragem retorna apenas planos ≤ orçamento
- Ordenação decrescente por preço
- Toggle de tema persiste no localStorage
- Slider atualiza valor em tempo real

### Testes de Integração

- Teste de fluxo completo: fetch → filtragem → renderização
- Teste de responsividade em diferentes viewports

### Testes E2E

- Teste do fluxo completo usando Playwright MCP
- Verificar que arrastar slider filtra cards corretamente
- Verificar toggle de tema altera visual

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Backend: Endpoint de dados** (sem dependências)
   - Criar `plans.json` com dados
   - Criar rota `/api/plans`
   - Testar endpoint

2. **Frontend: Migração para TypeScript** (depende de #1)
   - Migrar `App.jsx` → `App.tsx`
   - Migrar `main.jsx` → `main.tsx`
   - Criar tipos em `types/plan.ts`

3. **Frontend: Infraestrutura de tema** (depende de #2)
   - Criar `useTheme` hook
   - Criar `ThemeToggle` componente
   - Configurar CSS variables para dark/light

4. **Frontend: shadcn/ui Slider** (depende de #2)
   - Instalar `@radix-ui/react-slider`
   - Adicionar componente `slider.tsx`
   - Criar `BudgetSlider` componente

5. **Frontend: Hook de dados** (depende de #2)
   - Criar `usePlans` hook com fetch e filtragem

6. **Frontend: Componentes de UI** (depende de #4, #5)
   - Criar `PlanCard` componente
   - Criar `ToolsGrid` componente
   - Integrar tudo no `App.tsx`

7. **Configuração de testes** (paralelo)
   - Configurar Jest + Testing Library
   - Escrever testes unitários e de integração

8. **Responsividade** (depende de #6)
   - Implementar layout empilhado para mobile
   - Ajustar breakpoints Tailwind

### Dependências Técnicas

**Novas dependências (frontend):**
```bash
npm install @radix-ui/react-slider
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

**Novas dependências (backend):**
```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

## Monitoramento e Observabilidade

- **Logs**: `console.log` para DEBUG em desenvolvimento, `console.error` para erros
- **Métricas**: Não aplicável (aplicação frontend-heavy sem necessidade de métricas Prometheus)
- **Erros de fetch**: Exibir estado de erro na UI + log no console

## Considerações Técnicas

### Decisões Principais

| Decisão | Justificativa | Alternativas Rejeitadas |
|---------|---------------|------------------------|
| **shadcn/ui Slider** | Acessível, customizável, integra com Tailwind | Input range nativo (menos customizável) |
| **Filtragem client-side** | Latência zero, volume pequeno de dados (~12 planos) | Server-side filtering (overkill) |
| **Express endpoint** | Consistência com backend existente, fácil manutenção | JSON estático no frontend |
| **LocalStorage para tema** | Persistência simples sem backend | Cookie, sessionStorage |

### Riscos Conhecidos

| Risco | Mitigação |
|-------|-----------|
| Preços mudam frequentemente | JSON centralizado permite atualização fácil |
| shadcn/ui breaking changes | Pinned version em package.json |
| Dados de planos incorretos | Estrutura permite validação por tipo |

### Conformidade com Padrões

**Aplicáveis de `.windsurf/rules`:**
- `code-standards.md`: camelCase, PascalCase, kebab-case conforme contexto; const > let; early returns
- `http.md`: REST pattern, Express, códigos HTTP corretos (200, 404, 500)
- `logging.md`: console.log/error, sem dados sensíveis, mensagens claras
- `node.md`: TypeScript, npm, async/await, tipagem forte (sem any)
- `react.md`: Componentes funcionais, Tailwind, estado local, useMemo para filtros
- `tests.md`: Jest, AAA pattern, testes independentes, cobertura completa

### Arquivos relevantes e dependentes

**Backend:**
- `backend/src/index.ts` - Modificar para adicionar rota
- `backend/src/routes/plans.route.ts` - Novo
- `backend/src/data/plans.json` - Novo
- `backend/package.json` - Adicionar dependências de teste

**Frontend:**
- `frontend/src/App.jsx` → `frontend/src/App.tsx` - Migrar e refatorar
- `frontend/src/main.jsx` → `frontend/src/main.tsx` - Migrar
- `frontend/src/types/plan.ts` - Novo
- `frontend/src/hooks/usePlans.ts` - Novo
- `frontend/src/hooks/useTheme.ts` - Novo
- `frontend/src/components/BudgetSlider.tsx` - Novo
- `frontend/src/components/ToolsGrid.tsx` - Novo
- `frontend/src/components/PlanCard.tsx` - Novo
- `frontend/src/components/ThemeToggle.tsx` - Novo
- `frontend/src/components/ui/slider.tsx` - Novo (shadcn/ui)
- `frontend/src/index.css` - Modificar para CSS variables de tema
- `frontend/package.json` - Adicionar dependências
- `frontend/tsconfig.json` - Verificar configuração TS
