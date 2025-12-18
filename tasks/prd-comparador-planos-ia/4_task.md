# Tarefa 4.0: Testes E2E com Playwright

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar testes end-to-end usando Playwright para validar o fluxo completo da aplicação, garantindo que todas as funcionalidades funcionam corretamente do ponto de vista do usuário.

<requirements>
- Configurar Playwright no projeto
- Criar testes E2E para o fluxo principal do comparador
- Testar interação com slider e filtragem de cards
- Testar toggle de tema (Dark/Light)
- Testar filtro Individual/Enterprise
- Testar responsividade em diferentes viewports
</requirements>

## Subtarefas

- [ ] 4.1 Instalar e configurar Playwright (`npm init playwright@latest`)
- [ ] 4.2 Criar teste E2E: página carrega corretamente com 4 colunas de ferramentas
- [ ] 4.3 Criar teste E2E: slider filtra cards corretamente ao arrastar
- [ ] 4.4 Criar teste E2E: toggle de tema altera visual (dark/light)
- [ ] 4.5 Criar teste E2E: filtro Individual/Enterprise funciona
- [ ] 4.6 Criar teste E2E: responsividade mobile (layout empilhado)
- [ ] 4.7 Executar todos os testes e garantir que passam

## Detalhes de Implementação

Consultar a seção **"Testes E2E"** na `techspec.md` para:
- Cenários de teste prioritários
- Verificações esperadas

**Cenários de teste:**

1. **Carregamento inicial:**
   - Página carrega sem erros
   - 4 colunas de ferramentas visíveis (Copilot, Cursor, Claude, Windsurf)
   - Slider visível com valor inicial

2. **Interação com Slider:**
   - Arrastar slider para $20 → mostrar apenas planos ≤ $20
   - Arrastar slider para $0 → mostrar apenas planos Free
   - Arrastar slider para $200 → mostrar todos os planos

3. **Toggle de Tema:**
   - Clicar no toggle → tema muda de light para dark (ou vice-versa)
   - Recarregar página → tema persiste

4. **Filtro Individual/Enterprise:**
   - Selecionar Individual → mostrar apenas planos individuais
   - Selecionar Enterprise → mostrar apenas planos enterprise

5. **Responsividade:**
   - Viewport mobile (375px) → layout empilhado
   - Viewport desktop (1280px) → 4 colunas

## Critérios de Sucesso

- Playwright configurado e funcionando
- Todos os testes E2E passando
- Cobertura dos cenários críticos definidos
- Testes executam em menos de 60 segundos

## Testes da Tarefa

- [ ] Testes E2E
  - `comparator.spec.ts`: Carregamento inicial
  - `comparator.spec.ts`: Interação com slider
  - `comparator.spec.ts`: Toggle de tema
  - `comparator.spec.ts`: Filtro Individual/Enterprise
  - `comparator.spec.ts`: Responsividade

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `frontend/playwright.config.ts` (novo)
- `frontend/e2e/comparator.spec.ts` (novo)
- `frontend/package.json` (adicionar scripts de teste E2E)
