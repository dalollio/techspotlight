# Tech Spotlight #03 — Resumo Semana 1
> Periodo: 06/04 - 08/04/2026 (3 dias coletados)

---

## Metricas Parciais

| Metrica              | Valor |
|----------------------|-------|
| Cards Done           | 15    |
| Features             | 6     |
| Fixes                | 5     |
| Infra/Deploy         | 2     |
| Migracoes/Scripts    | 2     |
| Sistemas atendidos   | Agrotrace, Checkmilk, Agro Assistant, LP/Blog |

---

## Por Membro

### Ronaldo (4 cards)
- #11997 — Atividade no cadastro de propriedade (feature)
- #11899 — Botao salvar propriedade nao habilitava (fix)
- #12037 — Anexo com metadata nao abria (fix)
- #12033 — Erro gerar relatorio Checkmilk (fix)
- #12062 — Dashboard Carbono com KPIs e drill-down (in progress)

### Thielson (5 cards)
- #11762 — Importacao/Exportacao de Protocolo com respostas automaticas (feature)
- #12020 — Rate limit Resend no envio em massa (fix)
- #12007 — Labels configuraveis nos Comparativos (feature)
- #12006 — Accordion expandir ao filtrar (fix)
- #12040 — Migracao de respostas apos reestruturacao multiselect (script)
- #12029 — Respostas Automaticas: contador + otimizacao de chamadas (feature)
- #12058 — Fix procedure dashboard formulario (fix)

### Bruno (3 contextos)
- #11494 — Landing Pages Dinamicas + Blog: deploy K8s, blog, footer dinamico, secao apps (feature)
- #11734 — Opcao "Possui Validacao" em perguntas (feature)
- Agro Assistant — Setup completo: RAG (Python/FastAPI), API (NestJS/Drizzle), Web (React/Vite), chat com Mastra AI, fontes de conhecimento (projeto novo)

---

## Potenciais Spotlights (candidatos)

### 1. Agro Assistant — Setup do zero com RAG + AI (Bruno) ****
- **Por que:** Projeto novo com stack moderna (Mastra AI, RAG, pgvector, Gemini)
- **Historia:** Monorepo com 3 apps (RAG Python, API NestJS, Web React), agente de IA que classifica consultas agricolas, busca em base de conhecimento e retorna respostas estruturadas
- **Demo:** Chat fazendo consulta agricola ao vivo
- **Risco:** Projeto pode evoluir muito ate 08/05 — esperar mais dados

### 2. Dashboard Carbono — KPIs e drill-down por tema (Ronaldo) ***
- **Por que:** Dashboard analitico com consulta performatica, graficos e drill-down
- **Historia:** Demanda do Ricardo, construcao de painel com temas prioritarios
- **Demo:** Dashboard com filtros e drill-down
- **Risco:** Ainda in progress — acompanhar evolucao

### 3. Respostas Automaticas — Otimizacao de N+1 para 1 chamada (Thielson) ***
- **Por que:** Otimizacao real de performance — de 100+ chamadas para 1
- **Historia:** Ao editar pergunta com muitas respostas automaticas, cada item disparava uma chamada. Refatorado para uma unica chamada inicial
- **Demo:** Antes/depois no network tab

### 4. Rate Limit Resend — Envio de e-mail em massa (Thielson + time) **
- **Por que:** Problema real de producao, investigado em trio
- **Demo:** Simples, mas relevante

---

## Lightning Tech (candidatos)

- **Mastra AI + RAG** — Como montar um agente de IA com ferramentas de classificacao e auto-reflexao (Bruno)
- **Otimizacao N+1 no Angular** — Pattern de carregar tudo de uma vez vs chamadas individuais (Thielson)

---

## Proximos passos

- [ ] Continuar colando standups de 09/04 em diante
- [ ] Coletar screenshots do Dashboard Carbono quando estiver mais avancado
- [ ] Coletar screenshots do Agro Assistant (tela de chat, fontes de conhecimento)
- [ ] Proximo resumo: sexta 10/04 ou segunda 13/04
