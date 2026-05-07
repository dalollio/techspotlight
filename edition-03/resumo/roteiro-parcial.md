# TECH SPOTLIGHT #03 — WEB TEAM
> Periodo: 06/04 - 30/04/2026 | Apresentacao: 08/05/2026
> Apresentadores: Ronaldo, Bruno, Thielson
>
> STATUS: PARCIAL (3 de ~15 dias coletados)

---

## METRICAS PARCIAIS

| Metrica             | Valor |
|---------------------|-------|
| Cards Done          | 15    |
| Features entregues  | 6     |
| Fixes               | 5     |
| Migracoes/Scripts   | 2     |
| Infra/Deploy        | 2     |
| Sistemas atendidos  | Agrotrace, Checkmilk, Agro Assistant, LP/Blog |
| Stack               | NestJS, Angular, Drizzle, React/Vite, FastAPI/Python, Mastra AI, pgvector, Astro, Azure Pipelines, K8s |

---

## ABERTURA (3 min) — Ronaldo

Metricas do periodo:
- [a completar com dados finais]

Frase de abertura sugerida:
> "Esse sprint trouxe algo diferente — alem das entregas no Agrotrace,
> demos o primeiro passo num projeto novo que usa IA generativa
> para consultas agricolas. Vamos mostrar isso ao vivo."

---

## SPOTLIGHT 1 (5 min) — Bruno
**Tema:** Agro Assistant — IA para consultas agricolas, do zero ao chat funcional
**Arquivo simulado:** `agro-assistant.config.ts`

### PROBLEMA (2 min):
- Tecnicos de campo precisam consultar informacoes agricolas dispersas em documentos, manuais e protocolos
- Nao existe forma unificada de buscar esse conhecimento
- Consultas manuais sao lentas e dependem de quem conhece o assunto

### SOLUCAO (3 min):
- Monorepo com 3 aplicacoes: RAG (Python/FastAPI), API (NestJS/Drizzle), Web (React/Vite/TanStack Router)
- Servico RAG com Docling + pgvector + sentence-transformers para ingestao e busca semantica em documentos
- Agente Mastra AI que classifica a consulta, busca via RAG, faz auto-reflexao e retorna resposta estruturada
- Modulo de fontes de conhecimento com upload, versionamento e retry
- Infra com Docker Compose (PostgreSQL, Redis, MinIO)

### RESULTADO:
- Projeto funcional em 2 dias — do setup ao chat respondendo perguntas
- Stack moderna com IA integrada ao ecossistema Agrotrace

### DEMO:
Chat ao vivo fazendo consulta agricola

---

## SPOTLIGHT 2 (5 min) — Thielson
**Tema:** Respostas Automaticas — de 100+ chamadas para 1
**Arquivo simulado:** `respostas-automaticas.service.ts`

### PROBLEMA (2 min):
- Ao editar uma pergunta com muitas respostas automaticas configuradas, o front fazia uma chamada ao backend para CADA item da lista
- Perguntas com 100+ respostas automaticas disparavam 100+ requests
- Tela travava, experiencia degradada, risco de timeout

### SOLUCAO (3 min):
- Refatorado para uma unica chamada inicial que traz todos os itens
- Chamadas individuais so ocorrem ao adicionar ou editar um item especifico
- Adicionado contador visual para facilitar a gestao
- Filtro de perguntas inativas otimizado

### RESULTADO:
- De 100+ chamadas HTTP para 1 no carregamento inicial
- Tela responsiva mesmo com muitas respostas configuradas

### DEMO:
Network tab antes/depois (screenshot ou ao vivo)

---

## SPOTLIGHT 3 (5 min) — Ronaldo
**Tema:** Dashboard Carbono — painel analitico com drill-down por tema
**Arquivo simulado:** `carbon-dashboard.component.ts`

### PROBLEMA (2 min):
- Demanda de KPIs do programa Carbono sem visibilidade consolidada
- Dados dispersos, sem painel analitico para tomada de decisao
- Consultas pesadas que precisavam ser otimizadas

### SOLUCAO (3 min):
- Consulta SQL performatica para extracao dos dados
- Dashboard com temas prioritarios, KPIs e graficos
- Drill-down por tema para detalhamento

### RESULTADO:
- [a completar — ainda in progress]

### DEMO:
Dashboard ao vivo com filtros e drill-down

> **NOTA:** Este spotlight depende da evolucao nas proximas semanas.
> Se nao ficar robusto o suficiente, substituir por Landing Pages
> Dinamicas (Bruno) — deploy K8s + blog + footer dinamico.

---

## LIGHTNING TECH (5 min) — Bruno
**Tema:** Mastra AI — Como montar um agente com ferramentas em 30 minutos
**Arquivo simulado:** `mastra-agent.config.ts`

Conteudo:
- O que e Mastra AI e por que escolhemos (vs LangChain, vs direto)
- Anatomia do agente: classificacao -> busca RAG -> auto-reflexao -> resposta
- Como criar uma "tool" customizada (ex: busca RAG)
- Integracao com Gemini e variaveis de ambiente
- Resultado: agente funcional que responde perguntas agricolas

---

## ENGINEERING WINS (5 min) — Ronaldo

- Investigacao em trio (Ronaldo + Thielson + Bruno) do rate limit do Resend no envio em massa de e-mails — problema identificado e corrigido (#12020)
- Bruno entregou o setup completo do Agro Assistant em 2 dias — RAG + API + Web + chat com IA, tudo funcional
- Thielson criou script de migracao (#12040) para respostas de formulario dinamico apos reestruturacao — zero perda de dados em producao

---

## ROADMAP (2 min) — Ronaldo

Prioridades da proxima sprint:
- [ ] Dashboard Carbono — finalizar painel com todos os KPIs @ronaldo
- [ ] Agro Assistant — evoluir fontes de conhecimento e refinamento do RAG @bruno
- [ ] Formularios Dinamicos — estabilizacao pos-reestruturacao @thielson
