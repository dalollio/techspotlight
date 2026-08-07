---
name: generate-spotlight
description: Gera todo o material do Tech Spotlight do time Mobile — processa tasks.xlsx, cria cards.html, spotlight.html, renomeia diretório e atualiza index.html. Use quando precisar gerar uma nova edição do spotlight.
---

# Geração do Tech Spotlight — Mobile Team

Gerar todo o material necessário para apresentação do Spotlight do time Mobile.

## Estratégia de execução

Esta skill usa **subagents** para paralelizar o trabalho e manter o contexto principal limpo.
O agente principal atua como orquestrador: coleta inputs, dispara subagents e faz a finalização.

### Fluxo de orquestração

```
[Agente Principal]
    │
    ├─ Coleta inputs do usuário (data, período, agenda, destaques)
    │
    ├─ Subagent 1: Processar tasks.xlsx → cards.json
    │
    ├─── Após Subagent 1 concluir ───┐
    │                                 │
    │   ┌─────────────────────────────┼─────────────────────────┐
    │   │                             │                         │
    │   ▼                             ▼                         ▼
    │  Subagent 2:              Subagent 3:               Subagent 4:
    │  Criar cards.html         Criar spotlight.html      Atualizar index.html
    │   │                             │                         │
    │   └─────────────────────────────┼─────────────────────────┘
    │                                 │
    ├─── Após todos concluírem ───────┘
    │
    └─ Agente Principal: Renomear edition-last → edition-XX
```

## Informações a solicitar ao usuário

Antes de iniciar, pergunte **tudo de uma vez**:
1. **Data do Spotlight** — data da apresentação (ex: "22/05/2026")
2. **Período da edição** — intervalo coberto (ex: "27/04 – 22/05/2026")
3. **Agenda/Timeline** — tópicos e tempos de cada apresentador
4. **Destaques técnicos** — qual o spotlight de cada membro
5. **Tecnologias do período** — stack utilizada

---

## Subagent 1: Processar tasks.xlsx → JSON

**Executar como subagent (task_runner).**

Prompt para o subagent:

> Leia o arquivo `./edition-last/resumo/tasks.xlsx` e gere `./edition-last/resumo/cards.json` com os dados agrupados por usuário.
>
> Colunas do Excel: ID, Work Item Type, Title, Description, Assigned To, State, Created Date, Closed Date, Team, Project, Effort, Real Effort, Importância Valor, Priority.
>
> Mapeamento de tipos:
> - feat: User Story, Request, Enhancement
> - fix: Bug Fix, Production Issue
> - ref: Todos os demais tipos
>
> Membros:
> - Carlos → chave "ca", avInit "CA", avClass "av-ca", nameColor "var(--ca)"
> - Elias → chave "es", avInit "EL", avClass "av-el", nameColor "var(--el)"
> - Matheus → chave "ma", avInit "MA", avClass "av-ma", nameColor "var(--ma)"
>
> Formato de saída (JSON):
> ```json
> {
>   "ca": { "name": "Carlos", "avClass": "av-ca", "avInit": "CA", "nameColor": "var(--ca)", "cards": [{ "id": "#12345", "type": "feat", "title": "...", "desc": "..." }] },
>   "es": { ... },
>   "ma": { ... }
> }
> ```
>
> Regras:
> - id com prefixo # (ex: #12345)
> - desc: descrição técnica resumida (1-2 frases) baseada em Title + Description
> - Agrupar por Assigned To mapeando para o membro correto

---

## Subagent 2: Criar cards.html (depende do Subagent 1)

**Executar como subagent (task_runner), em paralelo com Subagents 3 e 4.**

Prompt para o subagent:

> Leia `./edition-last/resumo/cards.json` e `./cards.example.html`.
> Crie `./edition-last/cards.html` seguindo rigorosamente o template do example.
>
> Dados fornecidos pelo orquestrador:
> - Período: {periodo}
> - Número da edição: {numero_edicao}
> - Data do spotlight: {data_spotlight}
>
> Substituições:
> - Objeto DATA no script: usar dados do JSON com chaves ro (=ca), br (=es), th (=ma)
> - Datas do período: usar "{periodo}"
> - Número da edição: usar "{numero_edicao}"
> - Contadores no hero: calcular a partir dos dados (total, feat, fix, ref, test, por membro)
> - Data de geração no footer: usar "{data_spotlight}"
> - hero-sub: atualizar período, número da edição e observação de semanas

---

## Subagent 3: Criar spotlight.html (depende do Subagent 1)

**Executar como subagent (task_runner), em paralelo com Subagents 2 e 4.**
**Referência obrigatória**: usar `.kiro/skills/generate-spotlight/SPOTLIGHT-GUIDE.md` como guia de estrutura.

Prompt para o subagent:

> Leia `./edition-last/resumo/cards.json` e `./spotlight.example.html`.
> Crie `./edition-last/spotlight.html` seguindo rigorosamente o template do example.
>
> Dados fornecidos pelo orquestrador:
> - Data do spotlight: {data_spotlight}
> - Período: {periodo}
> - Número da edição: {numero_edicao}
> - Agenda: {agenda}
> - Destaques: {destaques}
> - Tecnologias: {tecnologias}
>
> Substituições obrigatórias:
> 1. ${data_spotlight} → "{data_spotlight}"
> 2. ${numero_edicao} → "{numero_edicao}"
> 3. Ronaldo → Carlos (em todo o arquivo)
> 4. Bruno → Elias (em todo o arquivo)
> 5. Thielson → Matheus (em todo o arquivo)
> 6. Todas as datas do período anterior → "{periodo}"
> 7. KPI_CARDS: array com {id, type, title, who} usando dados do JSON. Campo who = nome do membro
> 8. Contadores/métricas: valores reais calculados dos dados
> 9. Data da cover por extenso
> 10. Código da cover: edition, cards count, topics
> 11. Agenda/Timeline: usar {agenda}
> 12. Tags de tecnologia: usar {tecnologias}
> 13. Spotlights individuais: usar {destaques}

---

## Subagent 4: Atualizar index.html (depende do Subagent 1)

**Executar como subagent (task_runner), em paralelo com Subagents 2 e 3.**

Prompt para o subagent:

> Leia `./index.html` e atualize-o para incluir a nova edição.
>
> Dados fornecidos:
> - Número da edição: {numero_edicao}
> - Data do spotlight: {data_spotlight}
> - Período: {periodo}
>
> Ações:
> 1. Adicionar novo card como primeiro item do grid
> 2. Descomentar cards de edições anteriores que estejam comentados
> 3. Status: nova edição = "today"/"Hoje", anteriores = "done"/"Apresentado"
> 4. Adicionar atalho de teclado no script para a nova edição
> 5. Atualizar footer com atalhos disponíveis
>
> Formato do card:
> ```html
> <div class="card">
>   <div class="card-header">
>     <span class="card-edition">#{numero_edicao}</span>
>     <span class="card-status today">Hoje</span>
>   </div>
>   <div class="card-date">{data_spotlight}</div>
>   <div class="card-period">Período: <code>{periodo}</code></div>
>   <div class="card-actions">
>     <a href="edition-{numero_edicao}/spotlight.html" class="btn-spotlight">▶ Abrir Spotlight</a>
>     <a href="edition-{numero_edicao}/cards.html" class="btn-cards">📋 Ver Cards</a>
>   </div>
> </div>
> ```

---

## Passo final (Agente Principal): Renomear diretório

Após todos os subagents concluírem, o agente principal executa:

Renomear `./edition-last` para `./edition-XX` onde XX é o número sequencial (com zero à esquerda se < 10).

Determinar o número verificando o último diretório `edition-*` existente e incrementando.
