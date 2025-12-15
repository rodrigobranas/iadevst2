# Documento de Requisitos de Produto (PRD) - Comparador de Planos de IA

## Visão Geral

O "Comparador de Planos de IA" é uma ferramenta interativa projetada para ajudar desenvolvedores a escolherem a melhor ferramenta de assistência de código (AI Code Assistant) baseada em seu orçamento mensal. Através de um slider de orçamento, o usuário pode visualizar instantaneamente quais planos das principais ferramentas do mercado (GitHub Copilot, Cursor, Claude Code e Windsurf) cabem no seu bolso, facilitando a comparação de recursos e a tomada de decisão.

## Objetivos

- **Facilitar a decisão de compra**: Permitir que desenvolvedores visualizem rapidamente opções dentro de seu orçamento.
- **Comparação direta**: Exibir lado a lado as principais ferramentas do mercado para fácil comparação de recursos.
- **Engajamento**: Fornecer uma interface interativa e visualmente agradável que retenha a atenção do usuário.
- **Sucesso**: Usuário consegue identificar claramente qual plano oferece o melhor custo-benefício para seu orçamento em menos de 1 minuto.

## Histórias de Usuário

- **Como um desenvolvedor junior** com orçamento limitado, quero ver quais ferramentas gratuitas ou de baixo custo estão disponíveis para que eu possa começar a usar IA sem comprometer minha renda.
- **Como um líder técnico** com um orçamento de equipe de $50/mês/dev, quero comparar os planos "Business" ou "Pro" das ferramentas para decidir qual adotar na empresa.
- **Como um freelancer**, quero ajustar o orçamento dinamicamente para ver se vale a pena pagar um pouco mais por recursos avançados (como janelas de contexto maiores ou modelos mais inteligentes).

## Funcionalidades Principais

### 1. Slider de Orçamento Interativo
- **O que faz**: Permite ao usuário definir um valor máximo mensal que está disposto a gastar.
- **Como funciona**: Uma barra deslizante horizontal.
- **Requisitos Funcionais**:
    1.  Valor mínimo: $0.
    2.  Valor máximo: $200.
    3.  Incrementos (steps): $10.
    4.  Deve exibir claramente o valor selecionado em tempo real (ex: "$40/mês").
    5.  Moeda fixa em USD (Dólares Americanos).

### 2. Grid Comparativo de Ferramentas (4 Colunas)
- **O que faz**: Exibe os planos disponíveis para cada ferramenta baseada no orçamento selecionado.
- **Como funciona**: Quatro colunas fixas, uma para cada ferramenta, exibindo "Cards" de planos.
- **Requisitos Funcionais**:
    1.  Ferramentas obrigatórias e ordem fixa de exibição (esquerda para direita):
        1.  GitHub Copilot
        2.  Cursor
        3.  Claude Code
        4.  Windsurf
    2.  **Lógica de Exibição**:
        - Mostrar todos os planos da ferramenta cujo preço seja **menor ou igual** ao valor selecionado no slider.
        - Ordenação dos cards dentro da coluna: Preço decrescente (do mais caro para o mais barato).
        - Se nenhum plano couber no orçamento (teoricamente impossível pois todas têm plano Free, mas como salvaguarda), exibir estado vazio ou apenas o Free.
    3.  Apenas planos com preço público e explícito serão considerados (excluir planos "Sob Consulta" ou "Enterprise" sem preço fixo).

### 3. Cards de Detalhes do Plano
- **O que faz**: Apresenta as informações cruciais de cada plano.
- **Visual**: Estilo "Bento Grid", onde todos os cards na mesma linha/grid mantêm consistência visual e altura harmoniosa.
- **Requisitos Funcionais**:
    1.  Informações obrigatórias no card:
        - Nome do Plano (ex: "Free", "Pro", "Business").
        - Preço Mensal (ex: "$0", "$20").
        - Limites de Uso (ex: "2000 completions/mês", "500 fast requests").
        - Modelos Disponíveis (ex: "GPT-4o", "Claude 3.5 Sonnet").
        - Diferenciais chave (ex: "Context Window de 200k").
    2.  Design responsivo e esteticamente agradável.

### 4. Integração de Dados
- **O que faz**: Carrega os dados dos planos de uma fonte externa.
- **Requisitos Funcionais**:
    1.  Os dados dos planos NÃO devem estar *hardcoded* no componente frontend.
    2.  O frontend deve consumir um arquivo JSON servido via API.
    3.  Estrutura de dados deve suportar fácil atualização de preços e recursos.

## Experiência do Usuário (UX)

### Layout e Responsividade
- **Desktop**: Layout de 4 colunas lado a lado.
- **Mobile**:
    - O slider permanece fixo ou no topo.
    - As colunas se transformam em um layout empilhado verticalmente (uma ferramenta abaixo da outra) ou um carrossel, priorizando a legibilidade dos cards.
    - A ordem das ferramentas (Copilot -> Cursor -> Claude -> Windsurf) deve ser mantida.
- **Interação**:
    - O feedback visual ao mover o slider deve ser imediato (filtros aplicados em tempo real).
    - Animações suaves ao aparecer/desaparecer planos conforme o orçamento muda são desejáveis.

### Design Visual
- **Estética**: Limpa, moderna, orientada a desenvolvedores (possivelmente Dark Mode por padrão ou seguindo o sistema).
- **Consistência**: Altura dos cards deve ser unificada para evitar "buracos" no grid (Bento Layout).

## Restrições Técnicas de Alto Nível

- **Frontend**: Desenvolvido em React (compatível com a stack atual do projeto).
- **Dados**: JSON estático servido via endpoint simples (ex: Next.js API route ou arquivo estático em public, conforme arquitetura backend).
- **Performance**: O filtro deve ser executado no cliente (client-side) para garantir latência zero ao arrastar o slider, dado que o volume de dados é pequeno (4 ferramentas x ~3 planos cada).
- **Internacionalização**: Inicialmente apenas Inglês (termos técnicos) e moeda USD.

## Fora de Escopo

- Conversão de moedas (BRL, EUR, etc.) em tempo real.
- Planos anuais com desconto (comparação será baseada no preço mensal para simplificação, ou preço mensal equivalente se for a norma).
- Integração direta com APIs de pagamento ou checkout das ferramentas.
- Comparação de ferramentas fora da lista das 4 selecionadas.
- Planos "Enterprise" que exigem contato com vendas (sem preço público).

## Questões em Aberto

- *Nenhuma no momento. Requisitos clarificados.*
