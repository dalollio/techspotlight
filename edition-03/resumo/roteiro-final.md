# TECH SPOTLIGHT #03 — WEB TEAM
> Periodo: 06/04 - 30/04/2026 (4 semanas — excecao por feriados Tiradentes 21/04 + Dia do Trabalho 01/05)
> Apresentacao: 08/05/2026 (sexta)
> Apresentadores: Ronaldo, Bruno, Thielson
>
> **TARGET: 30 minutos** — programado em 23min, cap real 27min, buffer 3min.
> Edition #02 estourou 1h+ e teve feedback ruim. Disciplina de tempo e a meta principal.

---

## METRICAS DO PERIODO

| Metrica              | Valor |
|----------------------|-------|
| Cards entregues      | **69** (Ronaldo 29 · Thielson 27 · Bruno 13) |
| Features             | 38    |
| Fixes                | 26    |
| Refactors/Migração   | 3     |
| Tests                | 2     |
| Projetos novos       | 1 (ATER Digital — 8 marcos: setup, RAG, agente, Evolution API, chat, renomeação, etc.) |
| Sistemas atendidos   | Agrotrace-v3, Checkmilk, ATER Digital, Landing Page/Blog, CMS |
| Stack do periodo     | NestJS, TypeORM, Angular, PostgreSQL, MySQL, **+ Python/FastAPI, React/Vite, Drizzle ORM, Mastra AI, pgvector** |

---

## CRONOMETRO POR BLOCO

```
00:00 ─ 02:00   Capa + Metricas                    (Ronaldo)   2min
02:00 ─ 07:00   Spotlight 1: ATER Digital          (Bruno)     5min
07:00 ─ 11:00   Spotlight 2: Otimizacao N+1        (Thielson)  4min
11:00 ─ 16:00   Spotlight 3: Dashboard Carbono     (Ronaldo)   5min
16:00 ─ 19:00   Lightning Tech: Mastra AI + RAG    (Bruno)     3min
19:00 ─ 21:00   Engineering Wins                   (Ronaldo)   2min
21:00 ─ 23:00   Roadmap + Close                    (Ronaldo)   2min
─── 23:00 ─── PROGRAMADO ─── 30:00 ─── CAP ABSOLUTO ───
```

> Ordem de spotlights: Bruno (ATER) → Thielson (N+1) → Ronaldo (Carbono).
> Logica narrativa: abre com projeto novo (alto impacto visual via demo de chat),
> meio mostra ganho de performance puro (Network tab), fecha com dashboard
> consolidado (mais visual, deixa o gosto bom no final).

---

## ABERTURA — 2 min — Ronaldo

Métricas do período (slide stats.json):
- **69 cards** entregues em ~18 dias úteis (≈4/dia)
- 1 sistema novo nascendo: ATER Digital (8 marcos no período)
- 5 sistemas atendidos no total
- Stack expandida: time agora rodando Python + Mastra AI + pgvector além do core Angular/Nest

Frase de abertura:
> "Esse foi um periodo atipico — tivemos 4 semanas em vez de 3 por causa dos feriados.
> A boa noticia: deu pra nascer um sistema novo do zero, e ainda assim entregar dashboard,
> features e fixes nos sistemas que ja rodam. Vamos direto ao que tem de mais
> interessante tecnicamente."

**Aviso de tempo na abertura:**
> "Hoje a gente combinou 30 minutos. A apresentacao foi cronometrada pra 23, deixei
> o resto pra perguntas. Se falar demais, me cortem."

---

## SPOTLIGHT 1 — ATER Digital — 5 min — Bruno

**Arquivo simulado:** `ater-digital/README.md`

### PROBLEMA (1 min)
- Demanda nova: assistente para apoio ao produtor agricola via chat
- Precisa responder duvidas tecnicas com base em documentos reais (nao alucinar)
- Tem que rodar como produto independente, com deploy proprio

### SOLUÇÃO (3 min) — slide com arquitetura
- **Monorepo** com 3 apps:
  - `apps/rag/` — Python + FastAPI + Docling + pgvector + sentence-transformers
  - `apps/server/` — NestJS + Drizzle ORM + Postgres
  - `apps/web/` — React + Vite + TanStack Router + shadcn/ui
- **Stack agentica:** Mastra AI orquestra ferramentas de classificacao e auto-reflexao
- **Integracao externa:** Evolution API + Typebot (chat WhatsApp)
- **Avanco recente do Bruno (05/05-06/05):**
  - API administrativa de Typebot com chaves, guard dedicado e CRUD
  - Contexto do produtor para Typebot com sessao bearer curta
  - Captura inbound do WhatsApp via Evolution com parser validado, idempotencia e hash unico
  - Persistencia de usuarios parciais vindos do WhatsApp sem poluir listas de tecnico/assinatura
  - Perfil leve de IA para respostas mais diretas no canal externo
- **Infra:** docker-compose com Postgres + Redis + MinIO; deploy K8s separado
- **Renomeacao:** nasceu como `agro-assistant` (07/04), virou `ATER-DIGITAL` em 16/04
  com replace em codigo, manifestos K8s, configmaps e templates de e-mail —
  zero downtime no que ja estava em dev

### RESULTADO (30s)
- 1 produto novo, ja com chat funcional, RAG indexando documentos, fluxo
  WhatsApp-Typebot ativo e telas reais para produtor/tecnico

### DEMO (30s)
- Chat fazendo uma consulta agricola → busca em base de conhecimento → resposta
  estruturada com botoes inline
- Backup visual: galeria `edition-03/assets/ater-digital-1..7.png`, com foco em chat IA, fazenda/talhao e perfil do produtor
- Cap rigido de 30s — se travar, pular pra screenshot

⏰ **Cap:** 6 min. Se passar, cortar a demo.

---

## SPOTLIGHT 2 — Otimizacao N+1 em Respostas Automaticas — 4 min — Thielson

**Arquivo simulado:** `respostas-automaticas.service.ts`

### PROBLEMA (1 min)
- Ao editar uma pergunta com respostas automaticas configuradas, **cada item da
  lista disparava uma chamada ao backend**
- Perguntas com **100+ itens configurados** = 100+ chamadas em sequencia ao
  abrir pra edicao
- Network tab cheio, UI travando, tempo de abertura inaceitavel

### SOLUÇÃO (2 min)
- **Refatoracao:** uma unica chamada inicial traz **todos os itens de uma vez**
  ao abrir o editor
- Chamadas individuais ficam **so para adicao/edicao incremental** (1 nova
  resposta = 1 chamada)
- Inclusao de **contador por item** na tela pra dar visibilidade de quantas
  respostas estao configuradas (#12029)
- Junto: filtro de perguntas inativas otimizado

### RESULTADO (30s)
- **De 100+ chamadas → 1 chamada** ao abrir pra edicao
- Reducao mensuravel direto no Network tab

### DEMO (30s)
- Abrir Network tab
- Mostrar antes/depois (screenshots ou vídeo curto pré-gravado)

⏰ **Cap:** 5 min.

---

## SPOTLIGHT 3 — Dashboard Carbono com KPIs — 5 min — Ronaldo

**Arquivo simulado:** `carbono-dashboard.sql`

### PROBLEMA (1 min)
- Demanda do Ricardo: precisava de painel analitico de Carbono com KPIs
  consolidados, filtros e drill-down por tema
- Dados pulverizados em varias tabelas — query inocente derrubava o tempo de carga
- Diferentes stakeholders queriam visoes diferentes do mesmo dado

### SOLUÇÃO (3 min)
- **Procedure performatica** consolidando dados de carbono em estrutura otimizada
  pro dashboard (#12062, #12076, #12096 procedure desempenho por subtema)
- **Dashboard Carbono — KPI** (#12124): visualizacao consolidada dos indicadores
  do formulario de carbono em uma tela
- **Drill-down por tema:** clicar num KPI abre detalhes daquele tema
- **Iteracao com stakeholders:** #12166 (Revisar Indicadores) e #12183 (Melhorias)
  — duas rodadas de validacao com Iohan e Ricardo antes de fechar
- **Card de Retencao de Carbono** (#12076): ajuste fino de layout pra leitura
  rapida

### RESULTADO (30s)
- Dashboard carregando em tempo aceitavel (procedure vs query direta)
- 5 cards encadeados: #12062 → #12076 → #12124 → #12166 → #12183 — feature
  evoluida em ciclos curtos de validacao

### DEMO (30s)
- Abrir dashboard → mostrar 1 KPI → clicar pra drill-down → voltar
- Sem cliques exploratorios

⏰ **Cap:** 6 min.

---

## LIGHTNING TECH — Mastra AI no Ater-Digital: orquestrador de ferramentas — 3 min — Bruno

**Arquivo real:** `apps/server/src/shared/infra/ai/agents/agro-orchestrator.agent.ts`

### Por que e interessante
O Ater-Digital nao esta apenas chamando um LLM. O Mastra virou a camada de
orquestracao: decide quais ferramentas usar, preserva memoria por produtor,
carrega protocolos operacionais em markdown e conecta o chat do app com o canal
leve do WhatsApp/Typebot.

### Features reais para comentar
1. **Dois perfis de agente:** `full` para o app completo e `typebot` para
   WhatsApp. O perfil Typebot reutiliza RAG, clima, imagem e audio, mas nao
   aciona diario/missoes/gate phygital.
2. **Tools tipadas com Zod:** `classify_query`, `rag_search`, `get_weather`,
   `analyze_image`, `transcribe_audio`, `self_reflect`, `check_cycle_data`,
   `create_adhoc_mission` e ferramentas do MCP-Brasil.
3. **Working memory persistida em Postgres:** perfil do produtor, fazendas,
   talhoes, cultura, documentos, observacoes, semana atual, missoes pendentes
   e frescor do diario entram no contexto sem perguntar de novo.
4. **Workspace + skills markdown:** protocolos como `agro-rag-protocol`,
   `agro-phygital-cycle`, `agro-typebot-lite-routing` e `agro-tool-discipline`
   sao carregados pelo agente como guias operacionais.
5. **Processors/guardrails:** PII detector, prompt-injection detector,
   ToolCallFilter e EnsureFinalResponseProcessor para reduzir risco,
   economizar contexto e evitar resposta vazia no limite de steps.
6. **MCP-Brasil:** via meta-tools (`search_tools`, `call_tool`) para buscar
   dados publicos brasileiros sob demanda sem expor 300+ tools ao agente.

### Frase curta
> "A parte interessante nao e so o modelo responder; e o agente saber quando
> buscar manual, quando puxar clima, quando analisar imagem, quando criar missao
> e quando parar porque a confianca esta baixa."

⏰ **Cap:** 4 min. Se passar, cortar pro Wins.

---

## ENGINEERING WINS — 2 min — Ronaldo

3 destaques rapidos (40s cada):

1. **Rate limit Resend resolvido em trio** — Bruno + Thielson + Ronaldo investigaram
   problema de envio em massa de emails (#12020). Solucao: respeitar rate limit
   com batch + intervalo. Bug ia derrubar campanha de comunicacao real.

2. **Procedure performatica do Carbono** — sem ela, o dashboard nao virava produto.
   Reconhecimento da galera do back que ajudou a otimizar (#12096 procedure
   desempenho por subtema, #12062 procedure dashboard).

3. **Renomeacao agro-assistant → ATER-DIGITAL sem quebrar deploy** — substituicao
   em codigo, manifestos K8s, configmaps de 3 ambientes, templates de email,
   documentacao. Zero downtime.

⏰ **Cap:** 2 min.

---

## ROADMAP + CLOSE — 2 min — Ronaldo

**Proximo ciclo (edition #04, 04/05 a 22/05):**

```
roadmap.todo
[ ] PEC Checkmilk — fluxo de reproducao animal completo (#12212) @thielson
[ ] Telas de cadastro padrao do CMS — janelas arrastaveis e tiling (#11801) @bruno
[ ] Lembretes WhatsApp/Email + integracao Prodes/Ruralshape (#12225, #12193) @ronaldo
```

**Frase de fechamento:**
> "Voltamos ao ciclo padrao de 3 semanas. Proxima Web: 22/05.
> Ate la, qualquer duvida sobre ATER, Carbono ou N+1 — fala com a gente."

⏰ **Cap:** 2 min.

---

## CHECKLIST PRE-APRESENTACAO

- [ ] Ensaiar cada spotlight UMA vez cronometrado — se passar do cap, cortar
- [ ] Demos pre-carregadas em abas do navegador
- [ ] Network tab da otimizacao N+1 com screenshot pronto (caso demo trave)
- [ ] Screenshot do dashboard Carbono (caso demo trave)
- [ ] Mastra agent code num gist/snippet pronto pra colar
- [ ] Cronometro visivel pra Ronaldo durante a apresentacao
- [ ] Combinar sinal de "passou do tempo" entre os 3 (ex: Ronaldo levanta a mao)
