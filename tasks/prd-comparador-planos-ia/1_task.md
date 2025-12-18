# Tarefa 1.0: Backend - Criar endpoint `/api/plans` com dados JSON

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar o endpoint REST que servirá os dados dos planos de todas as ferramentas de IA. Este endpoint será consumido pelo frontend para exibir os cards comparativos.

<requirements>
- Criar arquivo JSON com dados de 4 ferramentas: GitHub Copilot, Cursor, Claude Code, Windsurf (conforme definindo na techspec.md)
- Criar rota Express GET `/api/plans` que retorna o JSON
- Estrutura de dados deve seguir as interfaces definidas na techspec.md
- Resposta deve ter status 200 e Content-Type application/json
</requirements>

## Subtarefas

- [ ] 1.1 Criar arquivo `backend/src/data/plans.json` com dados de todas as ferramentas e planos
- [ ] 1.2 Criar arquivo `backend/src/routes/plans.route.ts` com a rota GET `/api/plans`
- [ ] 1.3 Registrar a rota no servidor Express (`backend/src/index.ts`)
- [ ] 1.4 Criar testes unitários para o endpoint
- [ ] 1.5 Validar que o endpoint retorna a estrutura correta

## Detalhes de Implementação

Consultar a seção **"Modelos de Dados"** e **"Endpoints de API"** na `techspec.md` para:
- Estrutura completa do JSON de planos
- Interface `Tool` e `Plan`
- Formato esperado da resposta

**Estrutura do JSON:**
- 4 ferramentas (GitHub Copilot, Cursor, Claude Code, Windsurf)
- Cada ferramenta com seus planos (Free, Pro, etc.)
- Cada plano com: id, name, price, limits, models, highlights

## Critérios de Sucesso

- Endpoint `/api/plans` responde com status 200
- JSON contém exatamente 4 ferramentas na ordem: GitHub Copilot, Cursor, Claude Code, Windsurf
- Todos os planos possuem os campos obrigatórios (id, name, price, limits, models, highlights)
- Testes passando com cobertura do endpoint

## Testes da Tarefa

- [ ] Testes de unidade
  - Teste que `/api/plans` retorna status 200
  - Teste que resposta contém array `tools` com 4 elementos
  - Teste que cada tool possui `id`, `name`, `slug`, `plans`
  - Teste que cada plan possui `id`, `name`, `price`, `limits`, `models`, `highlights`
- [ ] Testes de integração
  - Teste de requisição HTTP real ao endpoint usando supertest

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `backend/src/data/plans.json` (novo)
- `backend/src/routes/plans.route.ts` (novo)
- `backend/src/index.ts` (modificar para registrar rota)
- `backend/src/__tests__/plans.route.test.ts` (novo)
