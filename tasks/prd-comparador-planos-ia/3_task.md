# Tarefa 3.0: Frontend - Implementar UI completa

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar toda a interface do usuário do Comparador de Planos de IA, incluindo sistema de tema, slider de orçamento, grid de ferramentas, cards de planos, filtros e responsividade. Esta é a tarefa principal de desenvolvimento frontend.

<requirements>
- Sistema de tema Dark/Light Mode com toggle e persistência em localStorage
- Slider de orçamento interativo ($0-$200, steps de $10) usando shadcn/ui
- Hook `usePlans` para fetch de dados e filtragem client-side
- Grid de 4 colunas com ferramentas (GitHub Copilot, Cursor, Claude Code, Windsurf)
- Cards de planos estilo Bento com informações: nome, preço, limites, modelos, diferenciais
- Filtro Individual/Enterprise
- Layout responsivo para mobile (empilhado verticalmente)
- Animações suaves ao filtrar planos
</requirements>

## Subtarefas

### Sistema de Tema
- [ ] 3.1 Criar hook `frontend/src/hooks/useTheme.ts` para gerenciamento de tema
- [ ] 3.2 Criar componente `frontend/src/components/ThemeToggle.tsx`
- [ ] 3.3 Configurar CSS variables para dark/light mode em `frontend/src/index.css`
- [ ] 3.4 Criar testes para useTheme (toggle, persistência localStorage)

### Slider de Orçamento
- [ ] 3.5 Instalar dependência `@radix-ui/react-slider`
- [ ] 3.6 Criar componente `frontend/src/components/ui/slider.tsx` (shadcn/ui)
- [ ] 3.7 Criar componente `frontend/src/components/BudgetSlider.tsx`
- [ ] 3.8 Criar testes para BudgetSlider (valores min/max, steps, exibição do valor)

### Hook de Dados
- [ ] 3.9 Criar hook `frontend/src/hooks/usePlans.ts` com fetch e filtragem
- [ ] 3.10 Implementar lógica de filtragem por orçamento (planos ≤ budget)
- [ ] 3.11 Implementar ordenação decrescente por preço
- [ ] 3.12 Criar testes para usePlans (fetch, filtragem, ordenação)

### Componentes de UI
- [ ] 3.13 Criar componente `frontend/src/components/PlanCard.tsx` (estilo Bento)
- [ ] 3.14 Criar componente `frontend/src/components/ToolsGrid.tsx` (4 colunas)
- [ ] 3.15 Criar testes para PlanCard (renderização de dados)
- [ ] 3.16 Criar testes para ToolsGrid (4 colunas, ordem correta)

### Filtro Individual/Enterprise
- [ ] 3.17 Adicionar campo `type` aos planos no JSON (individual/enterprise)
- [ ] 3.18 Criar componente de filtro toggle Individual/Enterprise
- [ ] 3.19 Integrar filtro com usePlans
- [ ] 3.20 Criar testes para filtro

### Integração e Responsividade
- [ ] 3.21 Integrar todos os componentes no `App.tsx`
- [ ] 3.22 Implementar layout responsivo mobile (breakpoints Tailwind)
- [ ] 3.23 Adicionar animações de transição ao filtrar
- [ ] 3.24 Criar testes de integração do fluxo completo

## Detalhes de Implementação

Consultar a `techspec.md` para:
- **Seção "Design de Implementação"**: Interfaces e estrutura dos hooks
- **Seção "Pontos de Integração"**: shadcn/ui Slider, Fetch API, LocalStorage
- **Seção "Dependências Técnicas"**: Pacotes a instalar

**Abordagem TDD (Red-Green-Refactor):**
1. Escrever testes primeiro para cada componente/hook
2. Implementar código mínimo para passar os testes
3. Refatorar mantendo testes verdes

**Componentes shadcn/ui:**
- Slider baseado em `@radix-ui/react-slider`
- Estilização com Tailwind CSS

**Filtragem client-side:**
- Filtrar planos onde `price <= budget`
- Ordenar por preço decrescente dentro de cada ferramenta

## Critérios de Sucesso

- Toggle de tema funciona e persiste no localStorage
- Slider exibe valor em tempo real e filtra cards instantaneamente
- Grid exibe 4 colunas no desktop, empilhado no mobile
- Cards mostram todas as informações obrigatórias (nome, preço, limites, modelos, diferenciais)
- Filtro Individual/Enterprise funciona corretamente
- Animações suaves ao aparecer/desaparecer planos
- Todos os testes passando

## Testes da Tarefa

- [ ] Testes de unidade
  - `useTheme.test.ts`: toggle, persistência, valor inicial
  - `usePlans.test.ts`: fetch, filtragem por budget, ordenação, filtragem por tipo
  - `BudgetSlider.test.tsx`: valores, steps, callback onChange
  - `PlanCard.test.tsx`: renderização de todos os campos
  - `ToolsGrid.test.tsx`: 4 colunas, ordem das ferramentas
  - `ThemeToggle.test.tsx`: interação de click
- [ ] Testes de integração
  - Fluxo completo: fetch → filtragem → renderização
  - Interação slider → atualização dos cards
  - Toggle tema → mudança visual

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `frontend/src/hooks/useTheme.ts` (novo)
- `frontend/src/hooks/usePlans.ts` (novo)
- `frontend/src/components/ThemeToggle.tsx` (novo)
- `frontend/src/components/BudgetSlider.tsx` (novo)
- `frontend/src/components/PlanCard.tsx` (novo)
- `frontend/src/components/ToolsGrid.tsx` (novo)
- `frontend/src/components/ui/slider.tsx` (novo)
- `frontend/src/App.tsx` (modificar)
- `frontend/src/index.css` (modificar)
- `frontend/package.json` (adicionar dependências)
- `backend/src/data/plans.json` (modificar - adicionar campo type)
